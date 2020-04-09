import {
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  useReducer,
} from "react";
import { useLazyQuery, QueryLazyOptions } from "@apollo/react-hooks";
import { LOAD_TIME_SERIES, GET_GLOBAL_STATS } from "../apollo/queries";
import { GlobalStats, DateRecord, GlobalChangeStat } from "../../../shared";

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

export type TimeSeriesRecord = {
  confirmed: TimeSeriesData[];
  deaths: TimeSeriesData[];
};

export type CountryData = {
  summary: Summary;
  regional?: Summary[];
  timeSeries: TimeSeriesRecord;
};

export type useDashboardState = {
  selectedCountry: string;
  onSelectedCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  allCountryData: CountryData;
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
    align: "left",
  },
  {
    Header: "Confirmed",
    accessor: "confirmed",
    align: "right",
  },
  {
    Header: "Deaths",
    accessor: "deaths",
    align: "right",
  },
  {
    Header: "Recovered",
    accessor: "recovered",
    align: "right",
  },
];

const useDashboardState = (): useDashboardState => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [allCountryData, setAllCountryData] = useState<CountryData>(
    {} as CountryData
  );
  const [globalData, setGlobalData] = useState<GlobalChangeStat>(
    {} as GlobalChangeStat
  );
  const [countryDataList, setCountryDataList] = useState<DateRecord[]>(
    [] as DateRecord[]
  );
  const [countryTimeSeries, setCountryTimeSeries] = useState<TimeSeriesRecord>(
    {} as TimeSeriesRecord
  );

  const [
    getGlobalStats,
    { loading: globalLoading, data: globalStats },
  ] = useLazyQuery(GET_GLOBAL_STATS);

  const [getTimeSeries, { loading, data: timeSeries }] = useLazyQuery(
    LOAD_TIME_SERIES
  );

  const onClickCountry = useCallback((country: string) => {
    setSelectedCountry(country);
    getTimeSeries({ variables: { name: country } });
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
      setGlobalData({ ...globalStats.globalStatsWithChange });
    }
    if (globalStats && globalStats.countryDataList) {
      setCountryDataList([...globalStats.countryDataList]);
    }
  }, [globalStats]);
  useEffect(() => {
    setCountryTimeSeries({ ...timeSeries });
  }, [timeSeries]);
  return {
    selectedCountry,
    onSelectedCountryChange,
    allCountryData,
    loading,
    getGlobalStats,
    globalData,
    countryDataList,
    COLUMNS,
    onClickCountry,
    countryTimeSeries,
  };
};
export default useDashboardState;
