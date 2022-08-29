import React, { useState } from "react";
import "./Home.css";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import ChatRoom from "./ChatRoom/ChatRoom";
import AppHeader from "./AppHeader";
import AccountPanel from "../Account/AccountPanel";

const Layout = styled(Box)(({ theme, drawerOpen }) => ({
  display: "grid",
  maxWidth: "1600px",
  overflow: "overlay",
  height: "100vh",
  // css is too hard
  gridTemplateRows: "min-content minmax(0, 1fr)",
  "& .app-header": {
    gridRow: "1/2",
  },
}));

const SubLayout = styled(Box)(({ theme }) => ({
  position: "relative",
  gridRow: "2/3",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    "& .chat-room": {
      width: "100%",
    },
  },
}));

export default function Home() {
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className="home">
      <Layout>
        <AppHeader toggleDrawer={toggleDrawer} />
        <SubLayout>
          <ChatRoom />
          <AccountPanel open={open} toggleDrawer={toggleDrawer} />
        </SubLayout>
      </Layout>
    </div>
  );
}
