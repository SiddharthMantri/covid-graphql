import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo/createClient";
import Home from "./Pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
