import React from "react";
import Home from "./Pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Home />
  </ThemeProvider>
);

export default App;
