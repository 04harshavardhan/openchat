import React, { useEffect, useRef } from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import SystemMsg from "./SystemMsg";
import ChatMsg from "./ChatMsg";

import { useMessagesList } from "../../firebase";

const MsgBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  width: "100%",
  flex: 1,
  // css was awesome
  display: "flex",
  flexDirection: "column-reverse",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: 6,
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 6,
    backgroundColor: "#8F93A2",
  },
}));

const LoadingDots = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "auto",
  "& .dot": {
    margin: theme.spacing(0.5),
    height: theme.spacing(1),
    backgroundColor: theme.palette.text.secondary,
  },
}));

export default function MessageBox() {
  const { oldMessages, newestMessages, loading, loadMore, hasMore } =
    useMessagesList();

  const msgBox = useRef();
  const loader = useRef();

  // since scroll behaviour was inverted thanks to css flexdirection
  // this would be scrollBottom
  const scrollHistory = useRef({
    previousScrollHeight: 0,
    previousScrollTop: 0,
  });

  useEffect(() => {
    if (!msgBox) return;
    const node = msgBox.current;

    scrollHistory.current.previousScrollHeight = node.scrollHeight;

    node.addEventListener("scroll", () => {
      scrollHistory.current.previousScrollTop = node.scrollTop;
    });
  });

  useEffect(() => {
    if (!msgBox) return;
    if (scrollHistory.current.previousScrollTop === 0) return;

    const changeInHeight =
      msgBox.current.scrollHeight - scrollHistory.current.previousScrollHeight;

    msgBox.current.scrollTop =
      scrollHistory.current.previousScrollTop - changeInHeight;
  }, [newestMessages]);

  useEffect(() => {
    const loaderObserver = new IntersectionObserver((entries) => {
      const loader = entries[0];

      if (loader.isIntersecting && !loading && hasMore) {
        loadMore();
      }
    });

    if (loader) {
      loaderObserver.observe(loader.current);
    }
  }, [loader, loading, loadMore, hasMore]);

  const newest = [];
  newestMessages.forEach((msg) => {
    if (msg.systemMsg === true) {
      newest.push(<SystemMsg msg={msg} key={msg.id} />);
    } else {
      newest.push(<ChatMsg msg={msg} key={msg.id} />);
    }
  });
  newest.reverse();

  const old = [];
  oldMessages.forEach((msg) => {
    if (msg.systemMsg === true) {
      old.push(<SystemMsg msg={msg} key={msg.id} />);
    } else {
      old.push(<ChatMsg msg={msg} key={msg.id} />);
    }
  });
  old.reverse();

  return (
    <MsgBox ref={msgBox}>
      {newest}
      {old}
      <LoadingDots ref={loader}>
        {hasMore ? (
          <>
            <Skeleton className="dot" />
            <Skeleton className="dot" />
            <Skeleton className="dot" />
          </>
        ) : (
          ""
        )}
      </LoadingDots>
      <div></div>
    </MsgBox>
  );
}
