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
  query GlobalStats{
    globalData{
      updated
      confirmed
      recovered
      deaths
      active
    }
  }
`

export const LOAD_COUNTRY_DATA = gql`
  query AllDataByCountry($name: String) {
    records(countryRegion: $name) {
      countryRegion
      provinceState
      confirmed
      deaths
      updated
      recovered
    }
    confirmed: timeSeries(type: "Confirmed", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    recovered: timeSeries(type: "Recovered", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    deaths: timeSeries(type: "Deaths", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
  }
`;
