import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { signInWithGoogle } from "../firebase";

import { LogoLarge } from "../Assets/Logo";

const WrapBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}));

export default function SignIn() {
  return (
    <WrapBox>
      <LogoLarge />
      <Button variant="outlined" onClick={signInWithGoogle}>
        Sign in with google
      </Button>
    </WrapBox>
  );
}
