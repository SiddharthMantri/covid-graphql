export const typeDefs = `
    type Query { 
      records(date: String, countryRegion: String): [DateData], 
      timeSeries(type: String!, countryRegion: String): [TimeSeries] 
      countryRegion(name: String): [CountryRegion]
    }
    type CountryRegion {
      name: String,
      region: String
    }
    type DateData { 
      provinceState: String,
      countryRegion: String,
      updated: String,
      confirmed: Int,
      deaths: Int,
      recovered: Int,
      lat: String,
      lng: String
     }
     type DateStat {
       date: String
       nums: Int
     }
     type TimeSeries {
      provinceState: String,
      countryRegion: String,
      lat: String,
      lng: String
      data: [DateStat]
     }
  `;
