import React from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import LoopIcon from "@mui/icons-material/Loop";
import DoneIcon from "@mui/icons-material/Done";

const MsgWrap = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  display: "flex",
  padding: theme.spacing(0, 1),
  marginBottom: theme.spacing(0.5),
  marginRight: "auto",
  marginLeft: "auto",
  "&.sent": {
    justifyContent: "flex-end",
    "& .msg": {
      flexDirection: "row-reverse",
      "& .msg-content": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  "&.received": {
    justifyContent: "flex-start",
    "& .msg": {
      flexDirection: "row",
      "& .msg-content": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const Msg = styled(Box)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  alignItems: "flex-end",
  gap: theme.spacing(1),
  "& .msg-content": {
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    whiteSpace: "pre-line",
    display: "flex",
    alignItems: "flex-end",
    "& .msg-info": {
      display: "flex",
      alignItem: "center",
      marginLeft: theme.spacing(0.5),
      fontSize: 10,
      "& .icon": {
        marginLeft: "0.25em",
        fontSize: 12,
      },
    },
  },
  "& .msg-userImg": {
    height: theme.spacing(2.5),
    width: theme.spacing(2.5),
  },
}));

export default function ChatMsg({ msg }) {
  let msgClass = msg.ownMsg ? "sent" : "received";

  const timeInfo = toTimeInfo(msg.timestamp);

  return (
    <MsgWrap className={msgClass}>
      <Msg className="msg">
        <Avatar
          alt={msg.userName}
          src={msg.userImg}
          className="msg-userImg"
          referrerPolicy="no-referrer"
        />
        <div className="msg-content">
          {msg.text}
          <div className="msg-info">
            <span aria-label="time stamp" className="timeStamp">
              {timeInfo}
            </span>
            {msg.ownMsg ? (
              msg.pending ? (
                <LoopIcon className="icon" aria-label="message sent" />
              ) : (
                <DoneIcon className="icon" aria-label="message pending" />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </Msg>
    </MsgWrap>
  );
}

function toTimeInfo(timestamp) {
  const today = new Date();

  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const day = date.toLocaleString("en-GB", { day: "2-digit" });
  const hour = date.toLocaleString("en-GB", { hour: "2-digit" });
  const min = date.toLocaleString("en-GB", { minute: "2-digit" });
  // for some reason 2 digit flag is not working for minutes
  const minute = ("00" + min).slice(-2);

  if (today.getFullYear() !== year) {
    return month + " " + year;
  } else if (
    today.getMonth() !== date.getMonth() ||
    today.getDate() !== date.getDate()
  ) {
    return day + " " + month;
  } else {
    return hour + " : " + minute;
  }
}
