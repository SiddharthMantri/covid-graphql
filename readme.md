## Covid-19 GraphQL API

> Apollo GraphQL server for retreiving Covid-19 Data by date

### Data

The data comes from the [2019 Novel Coronavirus (nCoV) Data Repository,
by John Hopkins University](https://github.com/CSSEGISandData/2019-nCoV). It is retrieved, transformed and cached for one hour.

### Usage

```sh
git clone https://github.com/SiddharthMantri/covid-graphql.git
cd covid-graphql
npm install
npm run start:server
```

The apollo client will be running at http://localhost:8080/graphql

#### Query data

The following queries can be run:

```graphql
// defaults to current date minus 1
{
  records{
    proviceState
    countryRegion
    updated
    confirmed
    deaths
    recovered
    lat
    lng
  }
}

{
  records(date: "MM-DD-YYYY"){
    proviceState
      countryRegion
      updated
      confirmed
      deaths
      recovered
      lat
      lng
  }
}

```

I've also added TimeSeries data from JHU and that is available as

```graphql
// time series type is required whereas countryRegion is optional
{
  timeSeries(type: "All" | "Confirmed" | "Deaths") {
    proviceState
    countryRegion
    lat
    lng
    data {
      date
      nums
    }
  }
  timeSeries(type: "All" | "Confirmed" | "Deaths", countryRegion: "String") {
    proviceState
    countryRegion
    lat
    lng
    data {
      date
      nums
    }
  }
}
```

#### Contribute

PRs are welcome. Feel free to add any and all datasets and points

#### License

MIT © [SiddharthMantri](https://github.com/SiddharthMantri)
