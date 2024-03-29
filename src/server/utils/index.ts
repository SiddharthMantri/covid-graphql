import Papa from "papaparse";
import { timeStamp } from "console";
import {
  CountryRegion,
  TimeSeries,
  DateStat,
  DateRecord,
  Country,
} from "../types";

const parseCsv = (string: string) =>
  Papa.parse(string, {
    header: true,
    dynamicTyping: true,
    worker: false,
  });

export const transformDateData = (csvString: string): DateRecord[] => {
  const json = parseCsv(csvString);
  const { data: array } = json;
  return array.map((item) => ({
    provinceState: item["Province/State"] || item["Province_State"],
    countryRegion: item["Country/Region"] || item["Country_Region"],
    updated: item["Last Update"] || item["Last_Update"],
    confirmed: item["Confirmed"],
    deaths: item["Deaths"],
    recovered: item["Recovered"],
    active: item["Active"],
    lat: item["Latitude"] || item["Lat"],
    lng: item["Longitude"] || item["Long_"],
  }));
};

export const transformTimeSeries = (csvString: string): TimeSeries[] => {
  const json = parseCsv(csvString);
  const { data: array } = json;
  return array.map((item) => {
    const newItem = {
      provinceState: item["Province/State"],
      countryRegion: item["Country/Region"],
      lat: item["Lat"],
      lng: item["Long"],
    };
    const data: DateStat[] = [];
    Object.keys(item).forEach((key) => {
      if (
        ["Province/State", "Country/Region", "Lat", "Long"].indexOf(key) < 0
      ) {
        data.push({
          date: key,
          nums: item[key],
        });
      }
    });
    return { ...newItem, data };
  });
};

export const transformCountries = (csvString: string): Country[] => {
  const dateRecords = transformDateData(csvString);
  const countrySet = new Set(dateRecords.map((item) => item.countryRegion));
  const response = [...countrySet].sort().map((item) => ({
    name: item,
    regions: [],
    lat: "",
    lng: "",
  }));
  dateRecords.forEach((record) => {
    const object = response.find((item) => item.name === record.countryRegion);
    if (object && object.regions) {
      if (record.provinceState && record.provinceState !== "") {
        object.lat = record.lat;
        object.lng = record.lng;
        object.regions.push({
          name: record.provinceState === null ? "" : record.provinceState,
        });
      }
    }
  });
  return response;
};

export const transformDailySeries = (csvString: string): TimeSeries[] => {
  const json = parseCsv(csvString);
  const { data: array } = json;
  const timerSeries = array.map((item) => {
    const newItem = {
      provinceState: item["Province/State"],
      countryRegion: item["Country/Region"],
      lat: item["Lat"],
      lng: item["Long"],
    };
    const data: DateStat[] = [];
    Object.keys(item).forEach((key) => {
      if (
        ["Province/State", "Country/Region", "Lat", "Long"].indexOf(key) < 0
      ) {
        data.push({
          date: key,
          nums: item[key],
        });
      }
    });
    return { ...newItem, data };
  });
  const daySeries: TimeSeries[] = [];

  for (let i = 0; i < timerSeries.length; i++) {
    const dataObject = timerSeries[i];
    const calculatedData = [];
    for (let k = 1; k < dataObject.data.length; k++) {
      const dataRow = dataObject.data[k];
      const prevDataRow = dataObject.data[k - 1];
      const objectRow = {} as DateStat;
      objectRow.date = dataRow.date;
      objectRow.nums =
        dataRow.nums - prevDataRow.nums > -1
          ? dataRow.nums - prevDataRow.nums
          : 0;
      calculatedData.push(objectRow);
    }
    dataObject.data = calculatedData;
    daySeries.push(dataObject);
  }

  return daySeries;
};
