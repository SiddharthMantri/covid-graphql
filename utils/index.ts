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
  console.log(array);
};
