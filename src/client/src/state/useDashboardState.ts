import { QueryLazyOptions, useLazyQuery } from "@apollo/react-hooks";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DateRecord, GlobalChangeStat, TimeSeriesRecord } from "../../../shared";
import { GET_GLOBAL_STATS, LOAD_TIME_SERIES } from "../apollo/queries";

export type TimeSeriesData = {
  provinceState: string;
  countryRegion: string;
  data: Array<{ date: string; nums: number }>;
};

export type Summary = {
  countryRegion: string;
  provinceState?: string;
  updated: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  all?: number;
};



export type CountryData = {
  summary: Summary;
  regional?: Summary[];
  timeSeries: TimeSeriesRecord;
};

export type useDashboardState = {
  selectedCountry: string;
  onSelectedCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  getGlobalStats: (options?: QueryLazyOptions<Record<string, any>>) => void;
  globalData: GlobalChangeStat;
  countryDataList: DateRecord[];
  COLUMNS: Array<{ Header: string; accessor: string; align?: string }>;
  onClickCountry: (country: string) => void;
  countryTimeSeries: TimeSeriesRecord;
};

const COLUMNS = [
  {
    Header: "Country",
    accessor: "countryRegion",
    align: "left"
  },
  {
    Header: "Confirmed",
    accessor: "confirmed",
    align: "right"
  },
  {
    Header: "Deaths",
    accessor: "deaths",
    align: "right"
  },
  {
    Header: "Recovered",
    accessor: "recovered",
    align: "right"
  }
];

const useDashboardState = (): useDashboardState => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [globalData, setGlobalData] = useState<GlobalChangeStat>(
    {} as GlobalChangeStat
  );
  const [countryDataList, setCountryDataList] = useState<DateRecord[]>(
    [] as DateRecord[]
  );
  const [countryTimeSeries, setCountryTimeSeries] = useState<TimeSeriesRecord>(
    {} as TimeSeriesRecord
  );

  const [countryStat, setCountryStat] = useState<GlobalChangeStat>(
    {} as GlobalChangeStat
  );

  const [
    getGlobalStats,
    { loading: globalLoading, data: globalStats }
  ] = useLazyQuery(GET_GLOBAL_STATS);

  const [getTimeSeries, { loading, data: timeSeries }] = useLazyQuery(
    LOAD_TIME_SERIES
  );

  const onClickCountry = useCallback((countryRegion: string) => {
    setSelectedCountry(countryRegion);
    getTimeSeries({ variables: { name: countryRegion } });
  }, []);

  const onSelectedCountryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedCountry(e.target.value);
    },
    []
  );
  useEffect(() => {
    if (selectedCountry !== "") {
      getTimeSeries({ variables: { name: selectedCountry } });
    }
  }, [selectedCountry]);
  useEffect(() => {
    getGlobalStats();
  }, []);
  useEffect(() => {
    if (globalStats && globalStats.globalData) {
      setGlobalData({ ...globalStats.getStatsWithChange });
    }
    if (globalStats && globalStats.countryDataList) {
      setCountryDataList([...globalStats.countryDataList]);
    }
  }, [globalStats]);
  useEffect(() => {
    setCountryTimeSeries({ ...timeSeries });
  }, [timeSeries]);
  useEffect(() => {
    setCountryStat({ ...countryStat });
  }, [countryStat]);
  return {
    selectedCountry,
    onSelectedCountryChange,
    loading,
    getGlobalStats,
    globalData,
    countryDataList,
    COLUMNS,
    onClickCountry,
    countryTimeSeries
  };
};
export default useDashboardState;
