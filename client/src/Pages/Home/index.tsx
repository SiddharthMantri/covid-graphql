import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import useDashboardState from "../..//state/useDashboardState";
import CountryList from "../../components/CountryList";
import LabelCard from "../../components/LabelCard";
import { DashboardContext } from "../../state/DashboardContext";
import { GlobalStats } from "../../../../shared";
import MapContainer from "../../components/MapContainer";
import DataChart from "../../components/DataChart";

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
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Home = () => {
  const classes = useStyles();
  const {
    selectedCountry,
    onSelectedCountryChange,
    allCountryData,
    loading: dataLoading,
    globalData,
    countryDataList,
    COLUMNS,
    onClickCountry,
    countryTimeSeries,
  } = useDashboardState();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9} md={9} lg={9}></Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="confirmed" data={globalData.confirmed} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="deaths" data={globalData.deaths} />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <LabelCard type="recovered" data={globalData.recovered} />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <LabelCard type="active" data={globalData.active} />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <CountryList
                onClickCountry={onClickCountry}
                data={countryDataList}
                columns={COLUMNS}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <DataChart
                timeSeries={countryTimeSeries}
                country={selectedCountry}
              />
            </Grid>
            <Grid item xs={12}>
              <MapContainer />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Home;
