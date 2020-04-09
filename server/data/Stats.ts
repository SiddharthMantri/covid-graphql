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
      updated: "",
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
      recs.forEach((record) => {
        let rec = results.findIndex(
          (item) => item.countryRegion === record.countryRegion
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
            deaths,
          };
        } else {
          results.push(record);
        }
      });
      return results;
    });
    return results.sort((a, b) => b.confirmed - a.confirmed);
  },
  async getGlobalStatsWithChange() {
    const date = dayjs()
      .subtract(1, "day")
      .format(DATE_FORMAT);
    const dateM2 = dayjs()
      .subtract(2, "day")
      .format(DATE_FORMAT);
    let result = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
      updated: "",
    };
    let res2 = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
      updated: "",
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
    res2 = await DataLoader.getDateData(dateM2).then((recs: DateRecord[]) => {
      recs.reduce((acc, next) => {
        acc.confirmed += isNaN(next.confirmed) ? 0 : next.confirmed;
        acc.recovered += isNaN(next.recovered) ? 0 : next.recovered;
        acc.active += isNaN(next.active) ? 0 : next.active;
        acc.deaths += isNaN(next.deaths) ? 0 : next.deaths;
        acc.updated = next.updated;
        return acc;
      }, res2);
      return res2;
    });

    const response = {
      confirmed: {
        number: result.confirmed,
        change: result.confirmed - res2.confirmed,
        perc: (result.confirmed - res2.confirmed) / res2.confirmed,
      },
      active: {
        number: result.active,
        change: result.active - res2.active,
        perc: (result.active - res2.active) / res2.active,
      },
      recovered: {
        number: result.recovered,
        change: result.recovered - res2.recovered,
        perc: (result.recovered - res2.recovered) / res2.recovered,
      },
      deaths: {
        number: result.deaths,
        change: result.deaths - res2.deaths,
        perc: (result.deaths - res2.deaths) / res2.deaths,
      },
    };

    return response;
  },
};
