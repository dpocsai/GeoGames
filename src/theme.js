import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Ubuntu",
  },
  palette: {
    primary: {
      main: "#729601",
      // light: "#bef67a",
      // dark: "#5a9216",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#966e01",
      // light: "#ffffe5",
      // dark: "#cbba83",
      contrastText: "#263238",
    },
    background: {
      paper: "#ffffe5",
      default: "#e4f0e2",
    },
  },
});

export default theme;
