import { DataLoader } from "../data/Data";
import { TimeSeries, DateRecord } from "../types";

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
          data.filter(
            (item: DateRecord) => item.countryRegion === args.countryRegion
          )
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
          data.filter(
            (item: TimeSeries) => item.countryRegion === args.countryRegion
          )
        );
      }
      return seriesData;
    },
    countryRegion: (
      obj: any,
      args: { name: string },
      context: any,
      info: any
    ) => {
      let countries = DataLoader.getCountries();
      if (args.name && args.name !== "") {
        return countries.then(data =>
          data.filter((item: any) => item.name === args.name)
        );
      }
      return countries;
    }
  }
};
