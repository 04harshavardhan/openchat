import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

import { useAuthState } from "./firebase";

import Home from "./Home/Home";
import Cover from "./Home/Cover";
import SignIn from "./Account/SignIn";

function App() {
  const { user, queryComplete } = useAuthState();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline injectFirst />
      <div className="App">
        {!queryComplete ? <Cover /> : user ? <Home /> : <SignIn />}
      </div>
    </ThemeProvider>
  );
}

export default App;
