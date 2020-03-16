import Cache from "../cache";
import axios from "axios";

const HOUR = 60 * 60 * 1;

const RAW_DATA = (date: string) =>
  `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;

let cacheService = new Cache({
  ttlSeconds: HOUR
});

const Data = {
  getData(date) {
    const key = `covid_data_${date}`;
    return cacheService
      .get(key, () => axios.get(RAW_DATA(date)))
      .then(result => result);
  }
};

export default Data;
