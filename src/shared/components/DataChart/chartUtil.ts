import { LegendProps } from "@nivo/legends";
import { useMemo, useState, SetStateAction } from "react";
import { TimeSeriesData } from "../../types";
import { DataChartProps } from "./index";
import dayjs from "dayjs";

export const theme = {
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
export const legends: LegendProps[] = [
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
];

const dataMapper = (data: TimeSeriesData[], type: string, color?: string) => {
  return data.map((item) => {
    let id = `${type}/${item.countryRegion}${
      item.provinceState !== null ? `/${item.provinceState}` : ""
    }`;
    return {
      id,
      color,
      data: item.data
        .filter((dataItem) => dataItem.nums !== 0)
        .map((dataItem) => ({
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

export const useDataChart = ({
  country,
  timeSeries,
  separate = false,
  showType = "deaths",
}: DataChartProps): [
  useChartDataType,
  "log" | "linear",
  React.Dispatch<SetStateAction<"log" | "linear">>
] => {
  const [type, setType] = useState("deaths");
  const [scale, setScale] = useState("linear" as "log" | "linear");
  const data = useMemo(() => {
    if (timeSeries && timeSeries.confirmed) {
      let response = [] as useChartDataType;

      if (showType === "deaths") {
        response = dataMapper(timeSeries.deaths, "Deaths", `hsl(2, 100%, 50%)`);
      } else {
        response = dataMapper(
          timeSeries.confirmed,
          "Confirmed",
          `hsl(218, 100%, 50%)`
        );
      }
      return [...response];
    }
    return [];
  }, [timeSeries]);
  return [data, scale, setScale];
};
