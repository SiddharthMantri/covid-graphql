import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core/styles";
import { SchemaLink } from "@apollo/link-schema";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router";
import Wrapper from "../../shared/components/Wrapper";
import { theme } from "../../shared/theme/theme";
import { resolvers, typeDefs } from "../schema";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  uploads: false,
});

export const AppTree = ({ client, theme, req, context }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <StaticRouter location={req.url} context={context}>
        <Wrapper />
      </StaticRouter>
    </ThemeProvider>
  </ApolloProvider>
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: {
    log: (e) => {
      console.log("Error in code", e);
    },
  },
});

export const Html = ({
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
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>COVID-19 Data tracker based on JHU Data</title>
      <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
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
      <script src="/main.js" />
    </body>
  </html>
);

export const expressRenderer = (req, res) => {
  const cache = new InMemoryCache();
  const sheets = new ServerStyleSheets();

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache,
  });
  const context = {} as StaticRouterContext;

  getMarkupFromTree({
    tree: sheets.collect(
      <AppTree theme={theme} client={client} context={context} req={req} />
    ),
    renderFunction: renderToString,
  })
    .then((markup) => {
      res.status(200);
      const css = sheets.toString();
      const state = client.extract();
      const html = <Html content={markup} state={state} css={css} />;

      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        res.end();
      } else {
        res.write(`<!doctype html>\n${renderToString(html)}`);
        res.end();
      }
    })
    .catch((e) => {
      console.error("RENDERING ERROR:", e); // eslint-disable-line no-console
      res.status(500);
      res.end("");
    });
};
