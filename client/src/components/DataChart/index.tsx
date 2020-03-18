import {
  Card,
  CardContent,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Chart } from "react-charts";
import { TimeSeriesData } from "../../state/useDashboardState";
interface ErrorState {
  hasError: boolean;
}
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
    minHeight: "420px"
    // padding: "16px"
  }
});

type DataChartProps = {
  country: string;
  timeSeries: {
    confirmed?: TimeSeriesData[];
    recovered?: TimeSeriesData[];
    deaths?: TimeSeriesData[];
  };
};

const dataMapper = (data: TimeSeriesData[], type: string) => {
  return data.map(item => {
    return {
      label: `${type}_${item.provinceState}`,
      datums: item.data.map(dataItem => ({
        x: dayjs(dataItem.date).toDate(),
        y: dataItem.nums
      }))
    };
  });
};

const useDataChart = ({ country, timeSeries }: DataChartProps) => {
  console.log(timeSeries);
  const data = useMemo(() => {
    if (timeSeries && timeSeries.confirmed) {
      let conf = dataMapper(timeSeries.confirmed, "Confirmed");
      let rec = dataMapper(timeSeries.recovered, "Recovered");
      let dth = dataMapper(timeSeries.deaths, "Deaths");
      return [...conf, ...rec, ...dth];
    }
    return [];
  }, [timeSeries]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );
  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  );
  return [data, axes, series];
};

const DataChart = ({ country, timeSeries }: DataChartProps) => {
  const classes = useStyles();
  const [data, axes, series] = useDataChart({ country, timeSeries });
  return (
    <Paper className={classes.root}>
      <ErrorBoundary>
        <Chart data={data} axes={axes} series={series} tooltip dark />
      </ErrorBoundary>
    </Paper>
  );
};
export default DataChart;
