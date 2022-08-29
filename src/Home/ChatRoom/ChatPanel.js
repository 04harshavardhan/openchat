import React, { useState } from "react";

import { postMessage } from "../../firebase";

import { styled } from "@mui/material";
import { TextareaAutosize, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(1, 1),
}));

const TextBox = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  width: "100%",
  maxWidth: 600,
  padding: 13,
  marginRight: theme.spacing(1),
  resize: "none",
  backgroundColor: theme.palette.secondBackground.default,
  borderRadius: theme.shape.borderRadius,
  border: "none",
  outline: "none",
  color: theme.palette.text.secondary,
  fontSize: theme.typography.fontSize,
  "&::-webkit-scrollbar": {
    width: 2,
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#8F93A2",
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1.25),
  "& .send-icon": {
    fontSize: theme.typography.fontSize * 1.25,
  },
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.secondBackground.default,
}));

export default function ChatBox() {
  const [msgTxt, setMsgText] = useState("");

  function sendMessage() {
    if (msgTxt !== "") {
      postMessage(msgTxt);
      setMsgText("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13 && e.shiftKey !== true) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleChange(e) {
    setMsgText(e.target.value);
  }

  return (
    <ChatForm onSubmit={handleSubmit}>
      <TextBox
        maxRows={4}
        placeholder="say something"
        type="text"
        variant="filled"
        onChange={handleChange}
        value={msgTxt}
        onKeyDown={handleKeyDown}
      />
      <SendButton type="submit">
        <SendIcon className="send-icon" />
      </SendButton>
    </ChatForm>
  );
}
