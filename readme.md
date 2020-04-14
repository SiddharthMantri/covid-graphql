## Covid-19 GraphQL API

> Apollo GraphQL server for retreiving Covid-19 Data by date

### Heroku App

The UI is deployed to [Heroku](http://covid-graphql.herokuapp.com/). It is a WIP


### Data

The data comes from the [2019 Novel Coronavirus (nCoV) Data Repository,
by John Hopkins University](https://github.com/CSSEGISandData/2019-nCoV). It is retrieved, transformed and cached for one hour. Keep in mind, that this is only the CSSE data. WHO situation reports need to be added.

### Usage

```sh
git clone https://github.com/SiddharthMantri/covid-graphql.git
cd covid-graphql
npm install
npm run dev
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

TimeSeries data from JHU is also available as

```graphql
// time series type is required whereas countryRegion is optional
{
  timeSeries(type:  "Confirmed" | "Deaths" | "Recovered" ) {
    proviceState
    countryRegion
    lat
    lng
    data {
      date
      nums
    }
  }
  timeSeries(type:  "Confirmed" | "Deaths" | "Recovered", countryRegion: "String") {
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

### Dashboard UI

Created a simple UI for the data. To run it - simply clone and run

```sh
npm run dev
```

#### Contribute

PRs are welcome. Feel free to add any and all datasets and points

#### License

MIT © [SiddharthMantri](https://github.com/SiddharthMantri)
