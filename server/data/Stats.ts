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
    result = await DataLoader.getDateDate(date).then((recs: DateRecord[]) => {
      recs.reduce((acc, next) => {
        acc.confirmed += isNaN(parseInt(next.confirmed, 10))
          ? 0
          : parseInt(next.confirmed, 10);
        acc.recovered += isNaN(parseInt(next.recovered, 10))
          ? 0
          : parseInt(next.recovered, 10);
        acc.active += isNaN(parseInt(next.active, 10))
          ? 0
          : parseInt(next.active, 10);
        acc.deaths += isNaN(parseInt(next.deaths, 10))
          ? 0
          : parseInt(next.deaths, 10);
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
    await DataLoader.getDateDate(date).then((recs: DateRecord[]) => {});
    return {};
  }
};
