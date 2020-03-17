import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOAD_COUNTRY_DATA } from "../apollo/queries";

export type TimeSeriesData = {
  provinceState: string;
  countryRegion: string;
  data: Array<{ date: string; nums: number }>;
};

type CountryData = {
  summary: {
    countryRegion: string;
    updated: string;
    confirmed: number;
    deaths: number;
    recovered: number;
    all?: number;
  };
  timeSeries: {
    confirmed: TimeSeriesData[];
    recovered: TimeSeriesData[];
    deaths: TimeSeriesData[];
  };
};

type useDashboardState = {
  selectedCountry: string;
  onSelectedCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  allCountryData: CountryData;
  loading: boolean;
};

const COUNTRY_RENAMES = {
  "Korea (Republic Of)": "South Korea"
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
      if (COUNTRY_RENAMES[e.target.value]) {
        setSelectedCountry(COUNTRY_RENAMES[e.target.value]);
      } else {
        setSelectedCountry(e.target.value);
      }
    },
    []
  );
  useEffect(() => {
    if (selectedCountry !== "") {
      if (COUNTRY_RENAMES[selectedCountry]) {
        getAllData(COUNTRY_RENAMES[selectedCountry]);
      } else {
        getAllData({ variables: { name: selectedCountry } });
      }
    }
  }, [selectedCountry]);
  useEffect(() => {
    if (allData) {
      let { records, confirmed, recovered, deaths } = allData;
      if (records && records.length > 0) {
        let [summary] = records;
        summary.all =
          (summary.confirmed || 0) +
          (summary.deaths || 0) +
          (summary.records || 0);
        let timeSeries = { confirmed, recovered, deaths };
        setCountryData({ ...allCountryData, summary, timeSeries });
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
