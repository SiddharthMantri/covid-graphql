import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  useMediaQuery,
  Grid,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { TimeSeriesData } from "../../state/useDashboardState";
import { Theme } from "@nivo/core";
interface ErrorState {
  hasError: boolean;
}
type DataChartProps = {
  country?: string;
  timeSeries?: {
    confirmed?: TimeSeriesData[];
    deaths?: TimeSeriesData[];
  };
};
class ErrorBoundary extends React.Component<{}, ErrorState> {
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
const theme = {
  background: "transparent",
  axis: {
    domain: {
      line: {},
    },
    ticks: {
      line: {},
      text: {},
    },
    legend: {
      text: {},
    },
  },
  grid: {
    line: {
      color: "black",
    },
  },
  legends: {
    text: {
      color: "white",
    },
  },
  labels: {
    text: {
      color: "white",
    },
  },
  markers: {
    lineColor: "black",
  },
  dots: {
    text: {
      color: "black",
    },
  },
  tooltip: {
    container: {
      color: "black",
    },
  },
};

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "480px",
    height: "480px",
    // padding: "16px"
  },
});

const dataMapper = (data: TimeSeriesData[], type: string, color?: string) => {
  return data.map((item) => {
    let id = `${type}/${item.countryRegion}${
      item.provinceState !== null ? `/${item.provinceState}` : ""
    }`;
    return {
      id,
      color,
      data: item.data.map((dataItem) => ({
        x: dayjs(dataItem.date).format("YYYY-MM-DD"),
        y: dataItem.nums,
      })),
    };
  });
};

type useChartDataType = {
  id: string;
  color: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

const useDataChart = ({
  country,
  timeSeries,
}: DataChartProps): [useChartDataType] => {
  const [type, setType] = useState("deaths");
  const handleClick = (e) => {
    setType(e.currentTarget.value);
  };
  const data = useMemo(() => {
    if (timeSeries && timeSeries.confirmed) {
      let conf = dataMapper(
        timeSeries.confirmed,
        "Confirmed",
        `hsl(218, 100%, 50%)`
      );
      let dth = dataMapper(timeSeries.deaths, "Deaths", `hsl(2, 100%, 50%)`);
      return [...dth];
    }
    return [];
  }, [timeSeries]);
  return [data];
};

const DataChart = ({ country, timeSeries }: DataChartProps) => {
  const classes = useStyles();
  const [data] = useDataChart({ country, timeSeries });

  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorScheme = useMemo(() => (isDarkMode ? "nivo" : "dark2"), [
    isDarkMode,
  ]);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}>
        <Grid container spacing={0}>
          <Grid item container xs={12}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h6">
                {country && country.length > 0
                  ? `Time series - Deaths - ${country}`
                  : ""}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: 420 }}>
              <ErrorBoundary>
                <ResponsiveLine
                  theme={theme}
                  animate={true}
                  data={data}
                  margin={{
                    top: 20,
                    right: 60,
                    bottom: 20,
                    left: 60,
                  }}
                  xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    precision: "day",
                  }}
                  xFormat="time:%Y-%m-%d"
                  yScale={{
                    type: "linear",
                    max: "auto",
                    min: "auto",
                  }}
                  colors={{ scheme: colorScheme }}
                  axisLeft={{
                    legend: "Datum",
                  }}
                  axisBottom={{
                    format: "%b %d",
                    tickValues: "every 5 day",
                    legend: "Dates",
                  }}
                  enablePointLabel={true}
                  pointSize={8}
                  enableSlices={false}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "top",
                      direction: "row",
                      justify: false,
                      translateX: 300,
                      translateY: -20,
                      itemsSpacing: 20,
                      itemDirection: "left-to-right",
                      itemWidth: 120,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
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
