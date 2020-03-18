import { Card, CardContent, makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Chart } from "react-charts";
import { TimeSeriesData } from "../../state/useDashboardState";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "420px"
  }
});

type DataChartProps = {
  timeSeries: {
    confirmed?: TimeSeriesData[];
    recovered?: TimeSeriesData[];
    deaths?: TimeSeriesData[];
  };
};

const mapper = item =>
  item.data.map(dataItem => ({
    x: dayjs(dataItem.date).toDate(),
    y: dataItem.nums
  }));

const useDataChart = ({ timeSeries }: DataChartProps) => {
  const data = useMemo(() => {
    if (timeSeries && timeSeries.confirmed) {
      let conf = {
        label: `Confirmed_${timeSeries.confirmed[0].provinceState || ""}`,
        datums: timeSeries.confirmed.map(mapper).flat()
      };
      let rec = {
        label: `Recovered_${timeSeries.confirmed[0].provinceState || ""}`,
        datums: timeSeries.recovered.map(mapper).flat()
      };
      let dth = {
        label: `Deaths_${timeSeries.confirmed[0].provinceState || ""}`,
        datums: timeSeries.deaths.map(mapper).flat()
      };
      return [conf, rec, dth];
    }
    return [];
  }, [timeSeries]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    [timeSeries]
  );
  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  );
  return [data, axes, series];
};

const DataChart = ({ timeSeries }: DataChartProps) => {
  const classes = useStyles();
  const [data, axes, series] = useDataChart({ timeSeries });
  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}>
        <Chart data={data} axes={axes} series={series} tooltip dark />
      </CardContent>
    </Card>
  );
};
export default DataChart;
