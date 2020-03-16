import express from "express";
import { ApolloServer } from "apollo-server-express";
import { DataLoader } from "./data/Data";

const app = express();
const port = 8080;

const typeDefs = `
    type Query { 
      records(date: String, countryRegion: String): [DateData], 
      timeSeries(type: String!, countryRegion: String): [TimeSeries] 
    }
    type DateData { 
      proviceState: String,
      countryRegion: String,
      updated: String,
      confirmed: String,
      deaths: String,
      recovered: String,
      lat: String,
      lng: String
     }
     type DateStat {
       date: String
       nums: String
     }
     type TimeSeries {
      proviceState: String,
      countryRegion: String,
      lat: String,
      lng: String
      data: [DateStat]
     }
  `;
const resolvers = {
  Query: {
    records: (
      obj: any,
      args: { date: string; countryRegion: string },
      context: any,
      info: any
    ) => {
      let datedData = DataLoader.getDateDate(args.date);
      if (args.countryRegion && args.countryRegion !== "") {
        return datedData.then(data =>
          data.filter(item => item.countryRegion === args.countryRegion)
        );
      }
      return datedData;
    },
    timeSeries: (
      obj: any,
      args: { type: string; countryRegion: string },
      context: any,
      info: any
    ) => {
      let seriesData = DataLoader.getTimeSeries(args.type);
      if (args.countryRegion && args.countryRegion !== "") {
        return seriesData.then(data =>
          data.filter(item => item.countryRegion === args.countryRegion)
        );
      }
      return seriesData;
    }
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
