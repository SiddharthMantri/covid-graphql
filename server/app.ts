import express from "express";
import { ApolloServer } from "apollo-server-express";
import Data from "../data/Data";
import dayjs from "dayjs";

const app = express();
const port = 8080;

const DataLoader = (date = "") => {
  if (date === "") {
    date = dayjs()
      .subtract(1, "day")
      .format("MM-DD-YYYY");
  }
  return Data.getData(date).then((response: any) => response);
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
  Query: {
    records: (obj: any, args: any, context: any, info: any) =>
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
