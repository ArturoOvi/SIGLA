import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#468B97",
    },
    secondary: {
      main: "#1D5B79",
    },
    error: {
      main: "#EF6262",
    },
    warning: {
      main: "#F3AA60",
    },
  },
});
