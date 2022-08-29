import React from "react";

import { auth, signOutFromGoogle } from "../firebase";

import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

const Wrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "fit-content",
  pointerEvents: "none",
  "& .collapse": {
    height: "100%",
  },
  "& .panel": {
    height: "100%",
    width: "100vw",
    pointerEvents: "all",
    backgroundColor: theme.palette.background.default,
  },
  "& .user-img": {
    height: theme.spacing(10),
    width: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  "& .user-name": {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.fontSize * 1.5,
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.up("sm")]: {
    position: "relative",
    "& .panel": {
      width: "400px",
    },
  },
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "80%",
}));

const CloseBtn = styled(Fab)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

export default function AccountPanel({ toggleDrawer, open }) {
  const { displayName, photoURL } = auth.currentUser;

  // request higher resolution img
  const url = photoURL.replace(new RegExp("s96-c$"), "s400-c");

  return (
    <Wrapper>
      <Collapse in={open} orientation="horizontal" className="collapse">
        <div className="panel">
          <CloseBtn aria-label="close" onClick={toggleDrawer}>
            <CloseIcon />
          </CloseBtn>
          <Card>
            <Avatar className="user-img" src={url} alt={displayName} />
            <span className="user-name">{displayName}</span>
            <Button
              onClick={signOutFromGoogle}
              color="error"
              endIcon={<LogoutIcon />}
            >
              Sign Out
            </Button>
          </Card>
        </div>
      </Collapse>
    </Wrapper>
  );
}
