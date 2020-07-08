import NodeCache from "node-cache";
import {
  transformDateData,
  transformTimeSeries,
  transformCountries,
  transformDailySeries,
} from "../utils";
import { AxiosResponse, AxiosError } from "axios";
import { DateRecord, TimeSeries, CountryRegion } from "../types";

/**
 *
 * Cache service code from https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b
 *
 */
class Cache {
  cache: NodeCache;
  constructor({ ttlSeconds }: { ttlSeconds: number }) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }
  getCachedDateData(key: string, storeFunction: Function) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);
    return storeFunction()
      .then((result: AxiosResponse<any>) => {
        console.log(`Data loaded. Cached into ${key}`);
        let transformed = transformDateData(result.data);
        this.cache.set(key, transformed);
        return transformed;
      })
      .catch((err: AxiosError): DateRecord[] => []);
  }
  getCachedTimeSeriesData(key: string, storeFunction: Function) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);
    return storeFunction()
      .then((result: AxiosResponse<any>) => {
        console.log(`Data loaded. Cached into ${key}`);
        let transformed = transformTimeSeries(result.data);
        this.cache.set(key, transformed);
        return transformed;
      })
      .catch((err: AxiosError): TimeSeries[] => []);
  }

  getCachedDailySeries(key: string, storeFunction: Function) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);
    return storeFunction()
      .then((result: AxiosResponse<any>) => {
        console.log(`Data loaded. Cached into ${key}`);
        let transformed = transformDailySeries(result.data);
        this.cache.set(key, transformed);
        return transformed;
      })
      .catch((err: AxiosError): TimeSeries[] => []);
  }

  getCountries(key: string, storeFunction: Function) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }
    console.log(
      `Data for ${key} not found. Requesting data from restCountries API`
    );
    return storeFunction()
      .then((result: AxiosResponse<any>) => {
        console.log(`Data loaded. Cached into ${key}`);
        let transformed = transformCountries(result.data);
        this.cache.set(key, transformed);
        return transformed;
      })
      .catch((err: AxiosError): CountryRegion[] => []);
  }

  getCacheStats() {
    return this.cache.getStats();
  }

  del(keys: string) {
    this.cache.del(keys);
  }

  delStartWith(startStr = "") {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}

export default Cache;
