import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  createStyles,
  CssBaseline,
  NoSsr
} from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import Routes from "../../routes/routes";
import useStyleReset from "../StyleReset";

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
    toolBarOffset: {
      minHeight: "64px"
    }
  })
);

const Wrapper = () => {
  const classes = useStyle();
  useStyleReset();
  return (
    <>
      <CssBaseline />

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
        <div
          style={{
            minHeight: "64px"
          }}
        ></div>
        <Switch>
          {Routes.map(route => (
            <Route key={route.name} {...route} />
          ))}
        </Switch>
      </div>
    </>
  );
};
export default Wrapper;
