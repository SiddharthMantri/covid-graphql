import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import React from "react";
import { StaticRouter } from "react-router";
import App from "../client/src/App";
import { resolvers, typeDefs } from "./schema";
import { renderToStringWithData } from "@apollo/react-ssr";
import ReactDOMServer from "react-dom/server";
import fetch from "node-fetch";

const app = express();
const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false
});

server.applyMiddleware({ app });

const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({
  schema,
  preserveResolvers: true
});

function Html({ content, state }) {
  return (
    <html>
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

app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });
  const context = {};
  const AppSsr = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
  renderToStringWithData(AppSsr)
    .then(content => {
      res.status(200);
      const initialState = client.extract();
      const html = <Html content={content} state={initialState} />;
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

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
