import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Container,
  Grid,
  List,
  makeStyles,
  Typography
} from "@material-ui/core";
import * as H from "history";
import React from "react";
import { GlobalChangeStat, TimeSeries } from "../../../../../src/shared";
import CountryListItem from "../../../../../src/shared/components/CountryListItem";
import { GET_COUNTRY_DATA } from "../../apollo/queries";

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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  card: {
    minWidth: "100%"
  },
  toolbar: theme.mixins.toolbar,
  typography: {
    textAlign: "center"
  },
  list: {
    paddingLeft: "0px",
    paddingRight: "0px"
  }
}));
const CountryDetail = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const {
    params: { country }
  } = match;
  const {
    loading,
    data,
    error
  }: {
    loading: boolean;
    data: Partial<{
      globalStatsWithChange: GlobalChangeStat;
      confirmed: TimeSeries[];
      deaths: TimeSeries[];
    }>;
    error?: any;
  } = useQuery(GET_COUNTRY_DATA, {
    variables: {
      name: country
    }
  });

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={12} md={3} lg={3} spacing={2}>
              <Grid item xs={12} sm={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5">
                      {country} - at a glance
                    </Typography>
                    <List className={classes.list}>
                      {data ? (
                        <>
                          <CountryListItem
                            type="confirmed"
                            data={data.globalStatsWithChange.confirmed}
                          />
                          <CountryListItem
                            type="deaths"
                            data={data.globalStatsWithChange.deaths}
                          />
                          <CountryListItem
                            type="active"
                            data={data.globalStatsWithChange.active}
                          />
                        </>
                      ) : null}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5">
                      Time since update - 
                    </Typography>
                    <List className={classes.list}>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default CountryDetail;
