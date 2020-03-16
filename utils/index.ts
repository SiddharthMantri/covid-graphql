import Papa from "papaparse";
const parseCsv = string =>
  Papa.parse(string, {
    header: true,
    dynamicTyping: true,
    worker: false
  });

export const transformDateData = csvString => {
  let json = parseCsv(csvString);
  let { data: array } = json;
  return array.map(item => ({
    provinceState: item["Province/State"],
    countryRegion: item["Country/Region"],
    updated: item["Last Update"],
    confirmed: item["Confirmed"],
    deaths: item["Deaths"],
    recovered: item["Recovered"],
    lat: item["Latitude"],
    lng: item["Longitude"]
  }));
};

export const transformTimeSeries = csvString => {
  let json = parseCsv(csvString);
  let { data: array } = json;
  return array.map(item => {
    let newItem = {
      provinceState: item["Province/State"],
      countryRegion: item["Country/Region"],
      lat: item["Lat"],
      lng: item["Long"]
    };
    let data = [];
    Object.keys(item).forEach(key => {
      if (
        ["Province/State", "Country/Region", "Lat", "Long"].indexOf(
          key
        ) < 0
      ) {
        data.push({
          date: key,
          nums: item[key]
        });
      }
    });
    return { ...newItem, data };
  });
};
