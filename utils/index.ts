import Papa from "papaparse";
const parseCsv = string =>
  Papa.parse(string, {
    header: true,
    dynamicTyping: true,
    worker: false
  });

export const transform = csvString => {
  let json = parseCsv(csvString);
  let { data: array } = json;
  let transformed = array.map(item => ({
    provinceState: item["Province/State"],
    countryRegion: item["Country/Region"],
    updated: item["Last Update"],
    confirmed: item["Confirmed"],
    deaths: item["Deaths"],
    recovered: item["Recovered"],
    lat: item["Latitude"],
    lng: item["Longitude"]
  }));
  return transformed;
};
