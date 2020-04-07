import { hot } from "react-hot-loader";
import React, { useMemo } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo/createClient";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import Wrapper from "./components/Wrapper";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default hot(module)(App);
