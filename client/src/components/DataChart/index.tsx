import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import React, { useMemo } from "react";
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

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "480px",
    height: "480px",
    // padding: "16px"
  },
});

const dataMapper = (data: TimeSeriesData[], type: string) => {
  return data.map((item) => {
    let id = `${type}/${item.countryRegion}${
      item.provinceState !== null ? `/${item.provinceState}` : ""
    }`;
    return {
      id,
      data: item.data.map((dataItem) => ({
        x: dayjs(dataItem.date).format("YYYY-MM-DD"),
        y: dataItem.nums,
      })),
    };
  });
};

const useDataChart = ({ country, timeSeries }: DataChartProps) => {
  const data = useMemo(() => {
    if (timeSeries && timeSeries.confirmed) {
      let conf = dataMapper(timeSeries.confirmed, "Confirmed");
      let dth = dataMapper(timeSeries.deaths, "Deaths");
      return [...conf, ...dth];
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
        <Typography variant="h6">
          {country && country.length > 0 ? `Time series - ${country}` : ""}
        </Typography>
        <ErrorBoundary>
          <ResponsiveLine
            animate={true}
            data={data}
            margin={{
              top: 0,
              right: 110,
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
            }}
            colors={{ scheme: colorScheme }}
            axisLeft={{
              legend: "Datum",
            }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 1 day",
              legend: "Dates",
            }}
            enablePointLabel={true}
            pointSize={8}
            enableSlices={false}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
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
      </CardContent>
    </Card>
  );
};
export default DataChart;
