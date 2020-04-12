import { Container, Grid, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import useDashboardState from "../../state/useDashboardState";
import CountryList from "../../components/CountryList";
import DataChart from "../../components/DataChart";
import LabelCard from "../../components/LabelCard";
import MapContainer from "../../components/MapContainer";
import useStyleReset from "../../../../shared/components/StyleReset";

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
  useStyleReset();
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
    countryTimeSeries
  } = useDashboardState();

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
              <LabelCard type="recovered" data={globalData.recovered} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <LabelCard type="active" data={globalData.active} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <NoSsr>
                <CountryList
                  onClickCountry={onClickCountry}
                  data={countryDataList}
                  columns={COLUMNS}
                />
              </NoSsr>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <NoSsr>
                <DataChart
                  timeSeries={countryTimeSeries}
                  country={selectedCountry}
                />
              </NoSsr>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default Home;
