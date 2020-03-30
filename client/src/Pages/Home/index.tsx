import { useLazyQuery } from "@apollo/react-hooks";
import { Grid, Container, LinearProgress } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useMemo } from "react";
import { COUNTRIES, GET_GLOBAL_STATS } from "../../apollo/queries";
import CountrySearch from "../../components/CountrySearch";
import DataChart from "../../components/DataChart";
import SummaryCard from "../../components/SummaryCard";
import useDashboardState from "../..//state/useDashboardState";
import { DashboardContext } from "../../state/DashboardContext";
import DatePicker from "../../components/DatePicker";
import ProvinceData from "../../components/ProvinceData";
import { useQuery } from "@apollo/react-hooks";
import { GlobalStats } from "../../../../shared";

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
  const { loading, error, data } = useQuery(GET_GLOBAL_STATS);
  let globalData = {} as GlobalStats;
  if (loading) {
    return null;
  } else {
    globalData = { ...data.globalData };
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                {globalData.confirmed}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
              <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "16px" }}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              <Grid item xs={12} sm={12} md={9} lg={9}></Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
};
export default Home;
