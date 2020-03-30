import { useQuery } from "@apollo/react-hooks";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { GlobalStats } from "../../../../shared";
import { GET_GLOBAL_STATS } from "../../apollo/queries";
import LabelCard from "../../components/LabelCard";
import CountryList from "../../components/CountryList";

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
                <CountryList type="active" data={globalData.active} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}></Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
};
export default Home;
