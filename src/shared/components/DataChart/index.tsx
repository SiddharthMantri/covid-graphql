import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Switch,
  Typography,
  useMediaQuery,
  Link,
} from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import { LinearScale, LogScale } from "@nivo/scales";
import { useMemo, Component } from "react";
import { legends, theme, useDataChart } from "./chartUtil";
import { TimeSeriesData } from "../../types";

interface ErrorState {
  hasError: boolean;
}

export type DataChartProps = {
  separate?: boolean;
  country?: string;
  timeSeries?: {
    confirmed?: TimeSeriesData[];
    deaths?: TimeSeriesData[];
  };
  showLog?: boolean;
  detailLink?: boolean;
  showType?: "deaths" | "confirmed";
};
class ErrorBoundary extends Component<{}, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h6">
          Error in rendering chart. Reload page and try again
        </Typography>
      );
    }

    return this.props.children;
  }
}

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "480px",
    height: "480px",
  },
});

const DataChart = ({
  country,
  timeSeries,
  separate = false,
  showLog,
  detailLink,
}: DataChartProps) => {
  const classes = useStyles();
  const [data, scale, setScale] = useDataChart({
    country,
    timeSeries,
    separate,
  });
  let scaleType = {} as LogScale | LinearScale;
  scaleType =
    scale === "log"
      ? {
          type: "log",
          base: 10,
          max: "auto",
        }
      : {
          type: "linear",
          max: "auto",
          min: "auto",
        };
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorScheme = useMemo(
    () => (isDarkMode ? "nivo" : "dark2"),
    [isDarkMode]
  );
  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}>
        <Grid container spacing={0}>
          <Grid item container xs={12}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h6">
                {country && country.length > 0
                  ? `Daily - Deaths - ${country}`
                  : ""}
              </Typography>
            </Grid>
            <Grid item container xs={12} md={6} lg={6}>
              {country && country.length > 0 && (
                <Typography component="div">
                  {showLog ? (
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>Linear Scale</Grid>
                      <Grid item>
                        <Switch
                          checked={scale === "log"}
                          onChange={() => {
                            setScale((prevState) =>
                              prevState === "log" ? "linear" : "log"
                            );
                          }}
                          name="checkedC"
                        />
                      </Grid>
                      <Grid item>Log Scale</Grid>
                    </Grid>
                  ) : null}
                  {detailLink ? (
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                      style={{
                        paddingTop: "8px",
                        textAlign: "right",
                      }}
                    >
                      <Link href={`/country/${country}`}>
                        View details for {country}
                      </Link>
                    </Grid>
                  ) : null}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: 420 }}>
              <ErrorBoundary>
                <ResponsiveLine
                  theme={theme}
                  animate
                  data={data}
                  margin={{
                    top: 20,
                    right: 60,
                    bottom: 20,
                    left: 40,
                  }}
                  xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    precision: "day",
                  }}
                  xFormat="time:%Y-%m-%d"
                  yScale={scaleType}
                  colors={{ scheme: colorScheme }}
                  axisLeft={{
                    legend: "Datum",
                  }}
                  axisBottom={{
                    format: "%b %d",
                    tickValues: "every 5 day",
                    legend: "Dates",
                  }}
                  enablePointLabel
                  pointSize={8}
                  enableSlices={false}
                  useMesh
                  legends={legends}
                />
              </ErrorBoundary>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DataChart;
