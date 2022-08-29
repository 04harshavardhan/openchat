import { useState, useEffect, useRef } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  orderBy,
  startAt,
  startAfter,
  limit,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDX2ftHH5MuRUhB8XJOT43Q1pq2ATvvqvg",
  authDomain: "openchat-417b2.firebaseapp.com",
  projectId: "openchat-417b2",
  storageBucket: "openchat-417b2.appspot.com",
  messagingSenderId: "990268981879",
  appId: "1:990268981879:web:3bb78786220fa8020bbc72",
  measurementId: "G-J7DJX2ET7N",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export function useAuthState() {
  const [user, setUser] = useState(null);
  const [queryComplete, setQueryComplete] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setQueryComplete(true);
    });
  }, []);

  return { user, queryComplete };
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export function signOutFromGoogle() {
  auth.signOut();
}

const messagesRef = collection(firestore, "messages");

export function useMessagesList() {
  const [retrieveCount, setCount] = useState(15);
  const [firstTime, setFirstTime] = useState(null);
  const [oldMessages, setOld] = useState([]);
  const [newestMessages, setNewest] = useState([]);
  const [loading, setLoading] = useState(true);
  const unload = useRef(null);

  window.onbeforeunload = unload;

  function loadMore() {
    setLoading((loading) => true);
    setCount((retrieveCount) => retrieveCount + 25);
  }

  function toMsgObj(doc) {
    const data = doc.data();
    return {
      id: doc.id,
      text: data.text,
      timestamp: data.timestamp,
      uid: data.uid,
      userName: data.userName,
      userImg: data.userImg,
      ownMsg: data.uid === auth.currentUser.uid,
      pending: doc.metadata.hasPendingWrites,
      systemMsg: data.systemMsg,
    };
  }

  // querrying newest messages
  useEffect(() => {
    (async () => {
      const first = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
      const firstSnap = await getDocs(first);
      let firstTime;
      let newest;

      if (firstSnap.docs.length === 0) {
        newest = query(messagesRef, orderBy("timestamp"));
        firstTime = null;
      } else {
        const firstMsg = toMsgObj(firstSnap.docs[0]);
        firstTime = firstMsg.timestamp;

        newest = query(
          messagesRef,
          orderBy("timestamp"),
          startAt(firstMsg.timestamp)
        );
      }

      onSnapshot(newest, (newestSnap) => {
        const newMsgList = [];

        newestSnap.forEach((doc) => {
          const newMsg = toMsgObj(doc);
          newMsgList.push(newMsg);

          if (newMsg.pending) {
            unload.current = () => "Changes you made may not be saved";
          } else {
            unload.current = null;
          }
        });

        setNewest(newMsgList);
        setFirstTime(firstTime);
        setLoading((loading) => false);
      });
    })();
  }, []);

  // querrying old messages
  useEffect(() => {
    if (firstTime === null) return;
    (async () => {
      const old = query(
        messagesRef,
        orderBy("timestamp", "desc"),
        startAfter(firstTime),
        limit(retrieveCount)
      );
      const oldSnap = await getDocs(old);

      setLoading((loading) => false);

      const oldList = [];
      oldSnap.forEach((doc) => {
        oldList.push(toMsgObj(doc));
      });

      oldList.reverse();
      setOld((oldMessages) => oldList);
    })();
  }, [retrieveCount, firstTime]);

  return {
    oldMessages,
    newestMessages,
    loading,
    loadMore,
    hasMore: retrieveCount <= oldMessages.length,
  };
}

export async function postMessage(text) {
  const { uid, displayName, photoURL } = auth.currentUser;

  await addDoc(messagesRef, {
    text,
    timestamp: serverTimestamp(),
    uid,
    userName: displayName,
    userImg: photoURL,
    systemMsg: false,
  });
}
