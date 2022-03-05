import NodeCache from "node-cache";
import {
  transformDateData,
  transformTimeSeries,
  transformCountries,
  transformDailySeries,
} from "../utils";
import { AxiosResponse, AxiosError } from "axios";
import { DateRecord, TimeSeries, CountryRegion, StoreFunction } from "../types";

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

  async getCachedDateData(key: string, storeFunction: StoreFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);

    const result = await storeFunction();
    console.log(`Data loaded. Cached into ${key}`);
    const transformed = transformDateData(result.data);
    this.cache.set(key, transformed);
    return transformed;
  }

  async getCachedTimeSeriesData(key: string, storeFunction: StoreFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);

    const result = await storeFunction();
    console.log(`Data loaded. Cached into ${key}`);
    const transformed = transformTimeSeries(result.data);
    this.cache.set(key, transformed);
    return transformed;
  }

  async getCachedDailySeries(key: string, storeFunction: StoreFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);

    const result = await storeFunction();
    console.log(`Data loaded. Cached into ${key}`);
    const transformed = transformDailySeries(result.data);
    this.cache.set(key, transformed);
    return transformed;
  }

  async getCountries(key: string, storeFunction: StoreFunction) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }
    console.log(
      `Data for ${key} not found. Requesting data from restCountries API`
    );

    const result = await storeFunction();
    console.log(`Data loaded. Cached into ${key}`);
    const transformed = transformCountries(result.data);
    this.cache.set(key, transformed);
    return transformed;
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
