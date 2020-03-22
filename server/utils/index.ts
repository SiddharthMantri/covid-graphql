import Papa from "papaparse";
import {
  CountryRegion,
  TimeSeries,
  DateStat,
  DateRecord,
  Country
} from "../types";

const parseCsv = (string: string) =>
  Papa.parse(string, {
    header: true,
    dynamicTyping: true,
    worker: false
  });

export const transformDateData = (csvString: string): DateRecord[] => {
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

export const transformTimeSeries = (csvString: string): TimeSeries[] => {
  let json = parseCsv(csvString);
  let { data: array } = json;
  return array.map(item => {
    let newItem = {
      provinceState: item["Province/State"],
      countryRegion: item["Country/Region"],
      lat: item["Lat"],
      lng: item["Long"]
    };
    let data: DateStat[] = [];
    Object.keys(item).forEach(key => {
      if (
        ["Province/State", "Country/Region", "Lat", "Long"].indexOf(key) < 0
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

export const transformCountries = (csvString: string): Country[] => {
  let dateRecords = transformDateData(csvString);
  let countrySet = new Set(dateRecords.map(item => item.countryRegion));
  let response = [...countrySet].sort().map(item => ({
    name: item,
    regions: []
  }));
  dateRecords.forEach(record => {
    let object = response.find(item => item.name === record.countryRegion);
    if (object && object.regions) {
      if (record.provinceState && record.provinceState !== "") {
        object.regions.push({
          name: record.provinceState === null ? "" : record.provinceState
        });
      }
    }
  });
  console.log(response);
  return response;
};
