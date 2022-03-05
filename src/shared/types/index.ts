import { ChangeEvent } from "react";
import { QueryLazyOptions } from "@apollo/client";

export type CountryRegion = {
  name: string;
  regions: Array<{ name: string }>;
};

export type TimeSeriesData = {
  provinceState: string;
  countryRegion: string;
  data: Array<{ date: string; nums: number }>;
};

export type Summary = {
  countryRegion: string;
  provinceState?: string;
  updated: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  all?: number;
};

export type CountryData = {
  summary: Summary;
  regional?: Summary[];
  timeSeries: TimeSeriesRecord;
};

export type useDashboardState = {
  selectedCountry: string;
  onSelectedCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  getGlobalStats: (options?: QueryLazyOptions<Record<string, any>>) => void;
  globalData: GlobalChangeStat;
  countryDataList: DateRecord[];
  COLUMNS: Array<{ Header: string; accessor: string; align?: string }>;
  onClickCountry: (country: string) => void;
  countryTimeSeries: TimeSeriesRecord;
};

export type DateRecord = {
  provinceState: string;
  countryRegion: string;
  updated: string;
  confirmed: number;
  deaths: number;
  recovered: string;
  lat: string;
  lng: string;
  active: number;
};
export type DateStat = {
  date: string;
  nums: string;
};
export type TimeSeries = {
  provinceState: string;
  countryRegion: string;
  lat: string;
  lng: string;
  data: DateStat[];
};

export type Country = {
  name: string;
  regions: Array<{ name: String }>;
};

export type GlobalStats = {
  updated: string;
  recovered: number;
  deaths: number;
  confirmed: number;
  active: number;
};

export type ChangeStat = {
  number: number;
  change: number;
  perc: number;
};

export type GlobalChangeStat = {
  active: ChangeStat;
  deaths: ChangeStat;
  confirmed: ChangeStat;
  recovered: ChangeStat;
};
export type TimeSeriesRecord = {
  confirmed: TimeSeriesData[];
  deaths: TimeSeriesData[];
};
declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

window.__APOLLO_STATE__ = window.__APOLLO_STATE__ || {};
