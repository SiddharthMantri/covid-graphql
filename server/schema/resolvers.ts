import { DataLoader } from "../data/Data";

export const resolvers = {
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
