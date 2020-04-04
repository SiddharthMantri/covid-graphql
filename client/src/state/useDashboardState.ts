import {
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  useReducer,
} from "react";
import { useLazyQuery, QueryLazyOptions } from "@apollo/react-hooks";
import { LOAD_TIME_SERIES, GET_GLOBAL_STATS } from "../apollo/queries";
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

const SET_SELECTED_COUNTRY = "dahboardState/SET_SELECTED_COUNTRY";
const SET_COUNTRY_DATA = "dahboardState/SET_COUNTRY_DATA";
const SET_GLOBAL_DATA = "dashboardState/SET_GLOBAL_DATA";
const SET_COUNTRY_DATA_LIST = "dashboardState/SET_COUNTRY_DATA_LIST";
const SET_COUNTRY_TIME_SERIES = "dashboardState/SET_COUNTRY_TIME_SERIES";

const initialState = {
  selectedCountry: "",
  allCountryData: {} as CountryData,
  globalData: {} as GlobalStats,
  countryDataList: [] as DateRecord[],
  countryTimeSeries: {} as TimeSeriesRecord,
};
const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_SELECTED_COUNTRY:
      return { ...state, selectedCountry: action.payload.selectedCountry };
    case SET_COUNTRY_DATA:
      return { ...state, allCountryData: action.payload.allCountryData };
    case SET_GLOBAL_DATA:
      return { ...state, globalData: action.payload.globalData };
    case SET_COUNTRY_DATA_LIST:
      return { ...state, countryDataList: action.payload.countryDataList };
    case SET_COUNTRY_TIME_SERIES:
      return { ...state };
    default:
      return state;
  }
};

const useDashboardState = (): useDashboardState => {
  const [
    {
      selectedCountry,
      allCountryData,
      globalData,
      countryDataList,
      countryTimeSeries,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [
    getGlobalStats,
    { loading: globalLoading, data: globalStats },
  ] = useLazyQuery(GET_GLOBAL_STATS);

  const [getTimeSeries, { loading, data: timeSeries }] = useLazyQuery(
    LOAD_TIME_SERIES
  );

  const onClickCountry = useCallback((country: string) => {
    console.log(country);
    getTimeSeries({ variables: { name: country } });
  }, []);

  const onSelectedCountryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      dispatch({
        type: SET_SELECTED_COUNTRY,
        payload: {
          selectedCountry: e.target.value,
        },
      });
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
      dispatch({
        type: SET_GLOBAL_DATA,
        payload: {
          globalData: { ...globalStats.globalData },
        },
      });
    }
    if (globalStats && globalStats.countryDataList) {
      dispatch({
        type: SET_COUNTRY_DATA_LIST,
        payload: {
          countryDataList: [...globalStats.countryDataList],
        },
      });
    }
  }, [globalStats]);
  useEffect(() => {
    dispatch({
      type: SET_COUNTRY_TIME_SERIES,
      payload: {
        countryTimeSeries: { ...timeSeries },
      },
    });
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
