import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useLazyQuery, QueryLazyOptions } from "@apollo/react-hooks";
import { LOAD_COUNTRY_DATA, GET_GLOBAL_STATS } from "../apollo/queries";
import { GlobalStats, DateRecord } from "../../../shared";

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
  recovered: TimeSeriesData[];
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
  globalData: GlobalStats;
  countryDataList: DateRecord[];
  COLUMNS: Array<{ Header: string; accessor: string; align?: string }>;
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
  const [allCountryData, setCountryData] = useState<CountryData>(
    {} as CountryData
  );
  const [globalData, setGlobalData] = useState<GlobalStats>({} as GlobalStats);
  const [countryDataList, setCountryDataList] = useState<DateRecord[]>(
    [] as DateRecord[]
  );

  const [
    getGlobalStats,
    { loading: globalLoading, data: globalStats }
  ] = useLazyQuery(GET_GLOBAL_STATS);

  const [getAllData, { loading, data: allData }] = useLazyQuery(
    LOAD_COUNTRY_DATA
  );
  const onSelectedCountryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setSelectedCountry(e.target.value);
    },
    []
  );
  useEffect(() => {
    if (selectedCountry !== "") {
      getAllData({ variables: { name: selectedCountry } });
    }
  }, [selectedCountry]);
  useEffect(() => {
    getGlobalStats();
  }, []);
  useEffect(() => {
    if (globalStats && globalStats.globalData) {
      setGlobalData({ ...globalStats.globalData });
    }
    if (globalStats && globalStats.countryDataList) {
      setCountryDataList([...globalStats.countryDataList]);
    }
  }, [globalStats]);
  return {
    selectedCountry,
    onSelectedCountryChange,
    allCountryData,
    loading,
    getGlobalStats,
    globalData,
    countryDataList,
    COLUMNS
  };
};
export default useDashboardState;
