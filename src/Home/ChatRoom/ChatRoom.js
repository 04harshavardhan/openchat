import React, { memo } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material";

import MessageBox from "./MessageBox";
import ChatPanel from "./ChatPanel";

function ChatRoom() {
  const ChatRoom = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    width: "100%",
    height: "100%",
    flex: 1,
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) min-content",
  }));

  return (
    <ChatRoom className="chat-room">
      <MessageBox />
      <ChatPanel />
    </ChatRoom>
  );
}

export default memo(ChatRoom);
