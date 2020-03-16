export type DateRecord = {
  proviceState: string;
  countryRegion: string;
  updated: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  lat: string;
  lng: string;
};
export type DateStat = {
  date: string;
  nums: string;
};
export type TimeSeries = {
  proviceState: string;
  countryRegion: string;
  lat: string;
  lng: string;
  data: DateStat[];
};
