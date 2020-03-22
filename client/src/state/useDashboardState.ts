import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOAD_COUNTRY_DATA } from "../apollo/queries";

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
};

const sumReducer = (
  array: Summary[],
  key: "confirmed" | "deaths" | "recovered"
) => {
  return array.reduce((acc, next) => {
    return acc + next[key];
  }, 0);
};

const useDashboardState = (): useDashboardState => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [allCountryData, setCountryData] = useState<CountryData>(
    {} as CountryData
  );

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
    if (allData) {
      let { records, confirmed, recovered, deaths } = allData;
      if (records && records.length > 0) {
        let [cSum, rSum, dSum] = [
          sumReducer(records, "confirmed"),
          sumReducer(records, "recovered"),
          sumReducer(records, "deaths")
        ];
        let all = cSum + rSum + dSum;
        let summary = {
          countryRegion: records[0].countryRegion,
          updated: records[0].updated,
          all,
          confirmed: cSum,
          deaths: dSum,
          recovered: rSum
        };
        let regional = [...records];
        let timeSeries = { confirmed, recovered, deaths };
        setCountryData({ ...allCountryData, summary, timeSeries, regional });
      }
    }
  }, [allData]);
  return {
    selectedCountry,
    onSelectedCountryChange,
    allCountryData,
    loading
  };
};
export default useDashboardState;
