import dayjs from "dayjs";
import { DATE_FORMAT } from "../utils/constants";
import { DataLoader } from "./Data";
import { DateRecord } from "../types";

export const Stats = {
  async getGlobalStats() {
    const date = dayjs()
      .subtract(1, "day")
      .format(DATE_FORMAT);
    let result = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
      updated: ""
    };
    result = await DataLoader.getDateData(date).then((recs: DateRecord[]) => {
      recs.reduce((acc, next) => {
        acc.confirmed += isNaN(next.confirmed) ? 0 : next.confirmed;
        acc.recovered += isNaN(next.recovered) ? 0 : next.recovered;
        acc.active += isNaN(next.active) ? 0 : next.active;
        acc.deaths += isNaN(next.deaths) ? 0 : next.deaths;
        acc.updated = next.updated;
        return acc;
      }, result);
      return result;
    });
    return result;
  },
  async getAllCountryStats() {
    const date = dayjs()
      .subtract(1, "day")
      .format(DATE_FORMAT);
    let results = [] as DateRecord[];
    results = await DataLoader.getDateData(date).then((recs: DateRecord[]) => {
      recs.forEach(record => {
        let rec = results.findIndex(
          item => item.countryRegion === record.countryRegion
        );
        if (rec > -1) {
          let confirmed = results[rec].confirmed + record.confirmed;
          let active = results[rec].active + record.active;
          let recovered = results[rec].recovered + record.recovered;
          let deaths = results[rec].deaths + record.deaths;
          results[rec] = {
            ...results[rec],
            confirmed,
            active,
            recovered,
            deaths
          };
        } else {
          results.push(record);
        }
      });
      return results;
    });
    return results.sort((a, b) => b.confirmed - a.confirmed);
  }
};
