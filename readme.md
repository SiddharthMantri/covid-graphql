## Covid-19 GraphQL API

> Apollo GraphQL server for retreiving Covid-19 Data by date

### Heroku App

The UI is deployed to [Heroku](http://covid-graphql.herokuapp.com/). It is a WIP


### Data

The data comes from the [2019 Novel Coronavirus (nCoV) Data Repository,
by John Hopkins University](https://github.com/CSSEGISandData/2019-nCoV). It is retrieved, transformed and cached for one hour. Keep in mind, that this is only the CSSE data. WHO situation reports have not been added.

### Usage

```sh
git clone https://github.com/SiddharthMantri/covid-graphql.git
cd covid-graphql
npm install
npm run dev
```

The apollo client will be running at http://localhost:8080/graphql

#### Query data

The schema currently available is:

```graphql

type Query {
  records(date: String, countryRegion: String): [DateData]
  timeSeries(type: String!, countryRegion: String): [TimeSeries]
  dailySeries(type: String!, countryRegion: String): [TimeSeries]
  country(name: String): [Country]
  countryDataList: [DateData]
  globalStatsWithChange(countryRegion: String): GlobalDataWithChange
  cacheStats: CacheStats
}

type ChangeStat {
  number: Int
  change: Int
  perc: Float
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

type GlobalData {
  updated: String
  confirmed: Int
  deaths: Int
  recovered: Int
  active: Int
}

type GlobalDataWithChange {
  confirmed: ChangeStat
  deaths: ChangeStat
  recovered: ChangeStat
  active: ChangeStat
}



type Region {
  name: String
}

type TimeSeries {
  provinceState: String
  countryRegion: String
  lat: String
  lng: String
  data: [DateStat]
}


```

### Dashboard UI

Created a simple UI for the data. To run it - simply clone and run

```sh
npm run dev
```

#### Contribute

PRs are welcome. Feel free to add any and all datasets and points

#### License

MIT © [SiddharthMantri](https://github.com/SiddharthMantri)
