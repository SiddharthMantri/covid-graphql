import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  createStyles
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../../Pages/Home";
import GitHubIcon from "@material-ui/icons/GitHub";
import Footer from "../Footer";

const useStyle = makeStyles(theme =>
  createStyles({
    title: {
      flexGrow: 1
    },
    root: {
      flexGrow: 1
    },
    toolbar: {
      padding: "0px 48px"
    },
    grow: {
      flexGrow: 1
    },
    icon: {
      textDecoration: "none",
      color: theme.palette.primary.contrastText
    },
    toolBarOffset: theme.mixins.toolbar
  })
);

const Wrapper = () => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar} variant="dense">
            <Typography variant="h5">Covid-19 Tracker</Typography>
            <div className={classes.grow}></div>
            <div>
              <a
                href="https://www.github.com/SiddharthMantri/covid-graphql"
                target="_blank"
                className={classes.icon}
              >
                <GitHubIcon />
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.toolBarOffset}></div>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    </>
  );
};
export default Wrapper;
