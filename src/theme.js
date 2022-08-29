import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f111a",
      second: "#181A1F",
      darker: "#090b1073",
      dark: "black",
    },
    secondBackground: {
      default: "#191A21",
    },
    primary: {
      main: "#82aaff",
      light: "#b6dbff",
      dark: "#4d7bcb",
    },
    secondary: {
      main: "#89ddff",
      light: "#beffff",
      dark: "#54abcc",
    },
    text: {
      primary: "#090b10",
      secondary: "#eeffff",
    },
  },
  typography: {
    fontFamily: `'Prompt', 'sans-serif'`,
  },
  spacing: (factor) => `${12 * factor}px`,
  shape: {
    borderRadius: 6,
  },
});

export default theme;
