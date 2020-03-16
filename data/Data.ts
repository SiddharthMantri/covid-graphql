import Cache from "../cache";
import axios from "axios";
import dayjs from "dayjs";

const HOUR = 60 * 60 * 1;

const RAW_DATE_DATA = (date: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

const RAW_TIME_SERIES_DATA = (type: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${type}.csv`;

let cacheService = new Cache({
  ttlSeconds: HOUR
});

export const Data = {
  getDataByDate(date) {
    const key = `covid_data_${date}`;
    return cacheService
      .get(key, () => axios.get(RAW_DATE_DATA(date)))
      .then(result => result);
  },
  getTimeSeries(type) {
    const key = `covid_data_${type}`;
    return cacheService
      .get(key, () => axios.get(RAW_TIME_SERIES_DATA(type)))
      .then(result => result);
  }
};
export const DataLoader = {
  getDateDate(date = "") {
    if (date === "") {
      date = dayjs()
        .subtract(1, "day")
        .format("MM-DD-YYYY");
    }
    return Data.getDataByDate(date).then((response: []) => response);
  },
  getTimeSeries(type = "") {
    return Data.getTimeSeries(type).then((response: []) => response);
  }
};

export default Data;
