import axios from "axios";
import dayjs from "dayjs";
import Cache from "../cache";
import { DateRecord, TimeSeries } from "../types";
import { DATE_FORMAT } from "../utils/constants";

const HOUR = 60 * 60 * 1;

const RAW_DATE_DATA = (date: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

const RAW_TIME_SERIES_DATA = (type: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${type}_global.csv`;

let cacheService = new Cache({
  ttlSeconds: HOUR,
});

export const Data = {
  getDataByDate(date: string) {
    const key = `covid_data_${date}`;
    return cacheService
      .getCachedDateData(key, () => axios.get(RAW_DATE_DATA(date)))
      .then((result: any) => result);
  },
  getTimeSeries(type: string) {
    const key = `covid_data_${type}`;
    return cacheService
      .getCachedTimeSeriesData(key, () => axios.get(RAW_TIME_SERIES_DATA(type)))
      .then((result: any) => result);
  },
  getCountries() {
    const key = "covid_data_countries";
    let date = dayjs()
      .subtract(1, "day")
      .format(DATE_FORMAT);
    return cacheService
      .getCountries(key, () => axios.get(RAW_DATE_DATA(date)))
      .then((result: any) => result);
  },
  getDailySeries(type: string) {
    const key = `covid_data_daily_${type}`;
    return cacheService
      .getCachedDailySeries(key, () => axios.get(RAW_TIME_SERIES_DATA(type)))
      .then((result: any) => result);
  },
};
export const DataLoader = {
  getDateData(date = ""): Promise<any> {
    if (date === "") {
      date = dayjs()
        .subtract(1, "day")
        .format(DATE_FORMAT);
    }
    return Data.getDataByDate(date).then((response: DateRecord[]) => response);
  },
  getTimeSeries(type = ""): Promise<any> {
    return Data.getTimeSeries(type).then((response: TimeSeries[]) => response);
  },
  getCountries(): Promise<any> {
    return Data.getCountries().then((response: any[]) => response);
  },
  getDailySeries(type = ""): Promise<any> {
    return Data.getDailySeries(type).then((response: any[]) => response);
  },
};

export default Data;
