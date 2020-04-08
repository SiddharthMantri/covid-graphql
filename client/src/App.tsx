import React, { useMemo, useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo/createClient";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import Wrapper from "../../shared/components/Wrapper";
import { theme } from "../../shared/theme/theme";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Wrapper />
    </ThemeProvider>
  );
};

export default App;
