import { AxiosResponse } from "axios";

export type DateRecord = {
  provinceState: string;
  countryRegion: string;
  updated: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  lat: string;
  lng: string;
  active: number;
};

export type DateStat = {
  date: string;
  nums: number;
};

export type TimeSeries = {
  provinceState: string;
  countryRegion: string;
  lat: string;
  lng: string;
  data: DateStat[];
};

export type CountryRegion = {
  name: String;
  region: String;
};

export type Country = {
  name: string;
  regions: Array<{ name: String }>;
  lat: string;
  lng: string;
};

export type StoreFunction = () => Promise<AxiosResponse<any>>;
