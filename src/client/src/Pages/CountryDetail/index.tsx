import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Container,
  Grid,
  List,
  makeStyles,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import * as H from "history";
import React, { useState, useEffect } from "react";
import { GlobalChangeStat, TimeSeries } from "../../../../../src/shared";
import CountryListItem from "../../../../../src/shared/components/CountryListItem";
import { GET_COUNTRY_DATA, LOAD_TIME_SERIES } from "../../apollo/queries";
import DataChart from "../../../../../src/shared/components/DataChart";
import { TimeSeriesData } from "../../state/useDashboardState";

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
  card: {
    minWidth: "100%",
  },
  toolbar: theme.mixins.toolbar,
  typography: {
    textAlign: "center",
  },
  list: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));
const CountryDetail = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const {
    params: { country },
  } = match;
  const variables = {
    name: country,
  };
  const [chartType, setChartType] = useState<"deaths" | "confirmed">("deaths");

  const [chartData, setChartData] = useState(
    {} as {
      confirmed?: TimeSeriesData[];
      deaths?: TimeSeriesData[];
    }
  );

  const { loading, data, error } = useQuery<
    Partial<{
      globalStatsWithChange: GlobalChangeStat;
      confirmed: TimeSeries[];
      deaths: TimeSeries[];
    }>
  >(GET_COUNTRY_DATA, {
    variables,
  });

  const { data: dailyData, error: dailyError } = useQuery(LOAD_TIME_SERIES, {
    variables,
  });

  const onTypeClick = (type) => () => {
    setChartType(type);
  };

  const ListItems = [
    {
      name: "Confirmed Cases Time Series",
    },
    {
      name: "Confirmed Cases Daily",
    },
    {
      name: "Deaths Time Series",
    },
    {
      name: "Deaths Daily",
    },
  ];

  useEffect(() => {
    if (dailyData && dailyData.deaths) {
      setChartData(dailyData);
    }
  }, [dailyData]);

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
                    <List className={classes.list} dense>
                      {ListItems.map((item, index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={12} lg={9} md={9}>
              <DataChart
                country={country}
                timeSeries={chartData}
                showLog={false}
                showType={chartType}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default CountryDetail;
