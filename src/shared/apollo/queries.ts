import { gql } from "@apollo/client";

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
    globalStatsWithChange {
      confirmed {
        number
        perc
        change
      }
      recovered {
        number
        perc
        change
      }
      deaths {
        number
        perc
        change
      }
      active {
        number
        perc
        change
      }
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
    confirmed: dailySeries(type: "confirmed", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    deaths: dailySeries(type: "deaths", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
  }
`;
export const GET_COUNTRY_DATA = gql`
  query GlobalStats($name: String) {
    globalStatsWithChange(countryRegion: $name) {
      confirmed {
        number
        perc
        change
      }
      recovered {
        number
        perc
        change
      }
      deaths {
        number
        perc
        change
      }
      active {
        number
        perc
        change
      }
    }
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
