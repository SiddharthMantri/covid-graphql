import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    records(date: String, countryRegion: String): [DateData]
    timeSeries(type: String!, countryRegion: String): [TimeSeries]
    dailySeries(type: String!, countryRegion: String): [TimeSeries]
    country(name: String): [Country]
    countryDataList: [DateData]
    globalStatsWithChange(countryRegion: String): GlobalDataWithChange
    cacheStats: CacheStats
  }

  type Region {
    name: String
  }

  type Country {
    name: String
    regions: [Region]
    lat: Int
    lng: Int
  }

  type DateData {
    provinceState: String
    countryRegion: String
    updated: String
    confirmed: Int
    deaths: Int
    recovered: Int
    active: Int
    lat: String
    lng: String
  }

  type DateStat {
    date: String
    nums: Int
  }

  type TimeSeries {
    provinceState: String
    countryRegion: String
    lat: String
    lng: String
    data: [DateStat]
  }

  type GlobalData {
    updated: String
    confirmed: Int
    deaths: Int
    recovered: Int
    active: Int
  }

  type ChangeStat {
    number: Int
    change: Int
    perc: Float
  }

  type GlobalDataWithChange {
    confirmed: ChangeStat
    deaths: ChangeStat
    recovered: ChangeStat
    active: ChangeStat
  }

  type CacheStats {
    hits: Int
    misses: Int
    keys: Int
    ksize: Int
    vsize: Int
  }
`;
