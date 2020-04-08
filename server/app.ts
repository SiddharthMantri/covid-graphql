import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import { resolvers, typeDefs } from "./schema";

const app = express();
const port = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "client/build"),
  });
});

app.listen({ port }, () => console.log(`Server ready at ${port}`));

export default app;
