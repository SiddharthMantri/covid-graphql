import React from "react";
import { makeStyles } from "@material-ui/core";
import * as H from "history";
type TParams = { country: string };
interface Props extends RouteComponentProps<TParams> {}
export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));
const CountryDetail = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        {JSON.stringify(match)}+2
      </main>
    </div>
  );
};

export default CountryDetail;
