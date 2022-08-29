import React, { memo } from "react";

import { auth } from "../firebase";

import { LogoSmall } from "../Assets/Logo";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";

const Bar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0.5, 1),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  height: theme.spacing(3),
  width: theme.spacing(3),
  marginLeft: "auto",
}));

function AppHeader({ toggleDrawer }) {
  const { photoURL } = auth.currentUser;

  function handleClick() {
    toggleDrawer();
  }

  return (
    <Box className="app-header">
      <AppBar position="static">
        <Bar>
          <LogoSmall />
          <UserAvatar src={photoURL} alt="User avatar" onClick={handleClick} />
        </Bar>
      </AppBar>
    </Box>
  );
}

export default memo(AppHeader);
