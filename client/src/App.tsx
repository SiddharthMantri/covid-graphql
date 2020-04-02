import React, { useMemo } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo/createClient";
import Home from "./Pages/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import Wrapper from "./components/Wrapper";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const darkTheme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        },
        overrides: {
          MuiAppBar: {
            colorPrimary: {
              backgroundColor: prefersDarkMode ? "#424242" : "#3f51b5"
            }
          }
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Wrapper />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
