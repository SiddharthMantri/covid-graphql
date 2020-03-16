import express from "express";
import { ApolloServer } from "apollo-server-express";
import { DataLoader } from "../data/Data";

const app = express();
const port = 8080;

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
  Query: {
    records: (obj: any, args: { date: string }, context: any, info: any) =>
      DataLoader(args.date)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
