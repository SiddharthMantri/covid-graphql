import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";
import { CssBaseline } from "@material-ui/core";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import express from "express";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import Layout from "../shared/routes/Layouts";
import { theme } from "../shared/theme/theme";
import { resolvers, typeDefs } from "./schema";
import Wrapper from "../shared/components/Wrapper";

const port = process.env.PORT || 8080;

const server = express();

const Html = ({
  content,
  state,
  css,
}: {
  content: string;
  state: any;
  css: string;
}) => (
  <html>
    <head>
      <style id="jss-server-side">{css}</style>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </body>
  </html>
);
const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({
  schema,
  preserveResolvers: true,
});
server.use((req, res) => {
  const sheets = new ServerStyleSheets();
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });
  const context = {};
  const AppHtml = sheets.collect(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Wrapper />
        </StaticRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
  ReactDOMServer.renderToString(AppHtml);
  const css = sheets.toString();
  getDataFromTree(AppHtml)
    .then(() => {
      const content = ReactDOMServer.renderToString(AppHtml);
      console.log(content);
      res.status(200);
      const state = client.extract();
      const html = <Html content={content} state={state} css={css} />;
      res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
      res.end();
    })
    .catch((e) => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      res.status(500);
      res.end(
        `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${e.stack}`
      );
    });
});

server.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}`)
);

export default server;
