import React from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const MsgWrap = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  display: "flex",
  padding: theme.spacing(0, 1),
  marginBottom: theme.spacing(0.5),
  marginRight: "auto",
  marginLeft: "auto",
  justifyContent: "center",
}));

const Msg = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: "0 12px",
  border: "1px solid",
  borderColor: "#717CB4",
  "& .msg-content": {
    color: "#717CB4",
    whiteSpace: "pre-line",
  },
}));

export default function SystemMsg({ msg }) {
  return (
    <MsgWrap>
      <Msg className="msg">
        <div className="msg-content">{msg.text}</div>
      </Msg>
    </MsgWrap>
  );
}
