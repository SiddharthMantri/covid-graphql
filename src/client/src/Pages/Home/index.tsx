import { useLazyQuery, useQuery } from "@apollo/client";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import CountryList from "../../../../shared/components/CountryList";
import DataChart from "../../../../shared/components/DataChart";
import LabelCard from "../../../../shared/components/LabelCard";
import {
  DateRecord,
  GlobalChangeStat,
  TimeSeriesRecord,
} from "../../../../shared/index";
import { GET_GLOBAL_STATS, LOAD_TIME_SERIES } from "../../apollo/queries";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: "100%",
  },
  toolbar: theme.mixins.toolbar,
}));
const COLUMNS = [
  {
    Header: "Country",
    accessor: "countryRegion",
    align: "left",
  },
  {
    Header: "Confirmed",
    accessor: "confirmed",
    align: "right",
  },
  {
    Header: "Deaths",
    accessor: "deaths",
    align: "right",
  },
  {
    Header: "Recovered",
    accessor: "recovered",
    align: "right",
  },
];

const Home = () => {
  const classes = useStyles();

  const [globalData, setGlobalData] = useState<GlobalChangeStat>(
    {} as GlobalChangeStat
  );
  const [countryDataList, setCountryDataList] = useState<DateRecord[]>(
    [] as DateRecord[]
  );
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryTimeSeries, setCountryTimeSeries] = useState<TimeSeriesRecord>(
    {} as TimeSeriesRecord
  );
  const { loading: gLoad, error, data: globalStats } = useQuery(
    GET_GLOBAL_STATS
  );

  const [getTimeSeries, { loading: tsLoad, data: timeSeries }] = useLazyQuery(
    LOAD_TIME_SERIES
  );

  const onClickCountry = useCallback((countryRegion: string) => {
    setSelectedCountry(countryRegion);
    getTimeSeries({ variables: { name: countryRegion } });
  }, []);

  useEffect(() => {
    if (globalStats) {
      setGlobalData({ ...globalStats.globalStatsWithChange });
      setCountryDataList([...globalStats.countryDataList]);
    }
  }, [globalStats]);

  useEffect(() => {
    if (timeSeries) {
      setCountryTimeSeries({ ...timeSeries });
    }
  }, [timeSeries]);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="confirmed" data={globalData.confirmed} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="deaths" data={globalData.deaths} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="active" data={globalData.active} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="recovered" data={globalData.recovered} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CountryList
                onClickCountry={onClickCountry}
                data={countryDataList}
                columns={COLUMNS}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <DataChart
                timeSeries={countryTimeSeries}
                country={selectedCountry}
                detailLink={true}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Home;
