import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "../../shared/components/Wrapper";
import { theme } from "../../shared/theme/theme";
import client from "../../shared/apollo/createClient";

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
