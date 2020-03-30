import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers, typeDefs } from "./schema";

const app = express();
const port = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
