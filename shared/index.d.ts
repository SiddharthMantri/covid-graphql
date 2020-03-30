export type DateRecord = {
  provinceState: string;
  countryRegion: string;
  updated: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  lat: string;
  lng: string;
  active: string;
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
export type CountryRegion = {
  name: String;
  region: String;
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
