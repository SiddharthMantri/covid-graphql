import { ApolloServer } from "apollo-server-express";
import express from "express";
import { resolvers, typeDefs } from "./schema";


const app = express();
const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
