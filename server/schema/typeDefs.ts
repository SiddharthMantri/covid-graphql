export const typeDefs = `
    type Query { 
      records(date: String, countryRegion: String): [DateData], 
      timeSeries(type: String!, countryRegion: String): [TimeSeries] 
    }
    type DateData { 
      proviceState: String,
      countryRegion: String,
      updated: String,
      confirmed: String,
      deaths: String,
      recovered: String,
      lat: String,
      lng: String
     }
     type DateStat {
       date: String
       nums: String
     }
     type TimeSeries {
      proviceState: String,
      countryRegion: String,
      lat: String,
      lng: String
      data: [DateStat]
     }
  `;
