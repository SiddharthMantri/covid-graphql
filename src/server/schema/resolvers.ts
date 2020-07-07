import { DataLoader } from "../data/Data";
import { TimeSeries, DateRecord } from "../types";
import { Stats } from "../data/Stats";

export const resolvers = {
  Query: {
    records: (
      obj: any,
      args: { date: string; countryRegion: string },
      context: any,
      info: any
    ) => {
      let datedData = DataLoader.getDateData(args.date);
      if (args.countryRegion && args.countryRegion !== "") {
        return datedData.then((data) =>
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
        return seriesData.then((data) =>
          data.filter(
            (item: TimeSeries) => item.countryRegion === args.countryRegion
          )
        );
      }
      return seriesData;
    },
    dailySeries: (
      obj: any,
      args: { type: string; countryRegion: string },
      context: any,
      info: any
    ) => {
      let seriesData = DataLoader.getDailySeries(args.type);
      if (args.countryRegion && args.countryRegion !== "") {
        return seriesData.then((data) =>
          data.filter(
            (item: TimeSeries) => item.countryRegion === args.countryRegion
          )
        );
      }
      return seriesData;
    },
    country: (obj: any, args: { name: string }, context: any, info: any) => {
      let countries = DataLoader.getCountries();
      if (args.name && args.name !== "") {
        return countries.then((data) =>
          data.filter((item: any) => item.name === args.name)
        );
      }
      return countries;
    },
    countryDataList: () => {
      return Stats.getAllCountryStats();
    },
    globalStatsWithChange: (
      obj: any,
      args: { countryRegion: string },
      context: any,
      info: any
    ) => {
      return Stats.getGlobalStatsWithChange(args.countryRegion);
    },
  },
};
