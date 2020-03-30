import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers, typeDefs } from "./schema";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { StaticRouter } from "react-router";
import { InMemoryCache } from "apollo-cache-inmemory";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import { SchemaLink } from "apollo-link-schema";
import React from "react";
import Layout from "../client/src/Layout";
import { renderToStringWithData, getDataFromTree } from "@apollo/react-ssr";
import ReactDOMServer from "react-dom/server";
import {
  ServerStyleSheets,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const app = express();
const port = process.env.PORT || 8080;

function Html({ content, state, css }) {
  return (
    <html>
      <head>
        <style id="jss-server-side">{css}</style>∏
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`
          }}
        />
      </body>
    </html>
  );
}

const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({
  schema,
  preserveResolvers: true
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

app.use((req, res) => {
  const sheets = new ServerStyleSheets();
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });
  const context = {};

  const AppHtml = sheets.collect(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Layout />
        </StaticRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
  ReactDOMServer.renderToString(AppHtml);
  const css = sheets.toString();
  getDataFromTree(AppHtml)
    .then(content => {
      res.status(200);
      const initialState = client.extract();
      const html = <Html content={content} state={initialState} css={css} />;
      res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
      res.end();
    })
    .catch(e => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      res.status(500);
      res.end(
        `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${e.stack}`
      );
    });
});

app.listen({ port }, () => console.log(`Server ready`));
