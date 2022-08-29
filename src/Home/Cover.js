import React from "react";

import { LogoLarge } from "../Assets/Logo";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& span": {
    fontSize: theme.typography.fontSize * 2.5,
    letterSpacing: "0.1em",
  },
  "& .primary": {
    color: theme.palette.primary.main,
  },
  "& .secondary": {
    color: theme.palette.secondary.main,
  },
}));

export default function Cover() {
  return (
    <Container>
      <LogoLarge />
      <span>
        <span className="primary">open</span>
        <span className="secondary">chat</span>
      </span>
    </Container>
  );
}
