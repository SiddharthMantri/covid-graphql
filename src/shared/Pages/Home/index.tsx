import { useLazyQuery, useQuery } from "@apollo/client";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from "react";
import { GET_GLOBAL_STATS, LOAD_TIME_SERIES } from "../../apollo/queries";
import CountryList from "../../components/CountryList";
import DataChart from "../../components/DataChart";
import LabelCard from "../../components/LabelCard";
import { ChangeStat, TimeSeriesRecord } from "../../../shared";

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

  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryTimeSeries, setCountryTimeSeries] = useState<TimeSeriesRecord>(
    {} as TimeSeriesRecord
  );
  const { data: globalStats } = useQuery(GET_GLOBAL_STATS);

  const [getTimeSeries, { data: timeSeries }] = useLazyQuery(LOAD_TIME_SERIES);

  const onClickCountry = useCallback((countryRegion: string) => {
    setSelectedCountry(countryRegion);
    getTimeSeries({ variables: { name: countryRegion } });
  }, []);

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
              <LabelCard
                type="confirmed"
                data={globalStats?.globalStatsWithChange?.confirmed}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard
                type="deaths"
                data={globalStats?.globalStatsWithChange?.deaths}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard
                type="active"
                data={globalStats?.globalStatsWithChange?.active}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard
                type="recovered"
                data={globalStats?.globalStatsWithChange?.recovered}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CountryList
                onClickCountry={onClickCountry}
                data={globalStats?.countryDataList}
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
