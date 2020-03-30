import { useLazyQuery } from "@apollo/react-hooks";
import { Grid, Container, LinearProgress } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useMemo } from "react";
import { COUNTRIES } from "../../apollo/queries";
import CountrySearch from "../../components/CountrySearch";
import DataChart from "../../components/DataChart";
import SummaryCard from "../../components/SummaryCard";
import useDashboardState from "../..//state/useDashboardState";
import { DashboardContext } from "../../state/DashboardContext";
import DatePicker from "../../components/DatePicker";
import ProvinceData from "../../components/ProvinceData";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const Home = () => {
  const classes = useStyles();
  const {
    selectedCountry,
    onSelectedCountryChange,
    allCountryData,
    loading: dataLoading
  } = useDashboardState();

  const [countries, setCountries] = useState([]);
  const [getCountries, { loading, data: countryData }] = useLazyQuery(
    COUNTRIES
  );
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    if (countryData && countryData.country) {
      setCountries(countryData.country);
    }
  }, [countryData]);
  let dataChart = useMemo(
    () => (
      <DataChart
        country={selectedCountry}
        timeSeries={allCountryData.timeSeries}
      />
    ),
    [selectedCountry, allCountryData]
  );
  return (
    <DashboardContext.Provider
      value={{ selectedCountry, onSelectedCountryChange }}
    >
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <CountrySearch
                  selectedCountry={selectedCountry}
                  countries={countries}
                  onChange={onSelectedCountryChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <DatePicker {...allCountryData.summary} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "16px" }}>
              <Grid item xs={12}>
                {dataLoading && <LinearProgress />}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SummaryCard {...allCountryData.summary} />
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                {/* {dataChart} */}
              </Grid>
            </Grid>
            {allCountryData.regional && allCountryData.regional.length > 0 && (
              <ProvinceData regional={allCountryData.regional} />
            )}
          </Container>
        </main>
      </div>
    </DashboardContext.Provider>
  );
};
export default Home;
