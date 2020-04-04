import { gql } from "apollo-boost";

export const COUNTRIES = gql`
  query Country($name: String) {
    country(name: $name) {
      name
      regions {
        name
      }
    }
  }
`;

export const GET_GLOBAL_STATS = gql`
  query GlobalStats {
    globalData {
      updated
      confirmed
      recovered
      deaths
      active
    }
    countryDataList {
      countryRegion
      confirmed
      recovered
      active
      deaths
      updated
    }
  }
`;

export const LOAD_TIME_SERIES = gql`
  query TimeSeries($name: String) {
    confirmed: timeSeries(type: "confirmed", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    deaths: timeSeries(type: "deaths", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
  }
`;
