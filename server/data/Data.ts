import axios from "axios";
import dayjs from "dayjs";
import Cache from "../cache";
import { DateRecord, TimeSeries } from "../types";

const HOUR = 60 * 60 * 1;

const RAW_DATE_DATA = (date: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

const RAW_TIME_SERIES_DATA = (type: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${type}.csv`;

const COUNTRY_ENDPOINT = "https://restcountries.eu/rest/v2/all";

let cacheService = new Cache({
  ttlSeconds: HOUR
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
    const key = `covid_countries`;
    return cacheService
      .getCountries(key, () => axios.get(COUNTRY_ENDPOINT))
      .then((result: any) => result);
  }
};
export const DataLoader = {
  getDateDate(date = ""): Promise<any> {
    if (date === "") {
      date = dayjs()
        .subtract(1, "day")
        .format("MM-DD-YYYY");
    }
    return Data.getDataByDate(date).then((response: DateRecord[]) => response);
  },
  getTimeSeries(type = ""): Promise<any> {
    return Data.getTimeSeries(type).then((response: TimeSeries[]) => response);
  },
  getCountries(): Promise<any> {
    return Data.getCountries().then((response: any[]) => response);
  }
};

export default Data;
