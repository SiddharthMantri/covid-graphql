import {
  Card,
  CardContent,
  makeStyles,
  Paper,
  Typography,
  Grid,
  Select,
} from "@material-ui/core";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
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
    minHeight: "420px",
    // padding: "16px"
  },
});

type DataChartProps = {
  country?: string;
  timeSeries?: {
    confirmed?: TimeSeriesData[];
    deaths?: TimeSeriesData[];
  };
};

const dataMapper = (data: TimeSeriesData[], type: string) => {
  return data.map((item) => {
    let id = `${item.countryRegion}${
      item.provinceState !== null ? `/${item.provinceState}` : null
    }`;
    return {
      id,
      data: item.data.map((dataItem) => ({
        x: dayjs(dataItem.date).toDate(),
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
  console.log(data);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}></CardContent>
    </Card>
  );
};
export default DataChart;
