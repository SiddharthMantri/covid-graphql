import express from "express";
import { ApolloServer } from "apollo-server-express";
import Data from "../data/Data";

const app = express();
const port = 8080;

const DataLoader = (date = "03-15-2020") => {
  return Data.getData(date).then(response => response);
};

const typeDefs = `
    type Query { records(date: String): [Record] }
    type Record { 
      proviceState: String,
      countryRegion: String,
      updated: String,
      confirmed: String,
      deaths: String,
      recovered: String,
      lat: String,
      lng: String
     }
  `;
const resolvers = {
  Query: { records: (obj, args, context, info) => DataLoader(args.date) }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

app.get("/data", (req, res) => {
  Data.getData("03-15-2020").then(response => {
    res.json(response);
  });
});

server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
