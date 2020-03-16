import NodeCache from "node-cache";
import { transformDateData } from "../utils";

/**
 *
 * Cache service code from https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b
 *
 */
class Cache {
  cache;
  constructor({ ttlSeconds }: { ttlSeconds: number }) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }

  get(key: string, storeFunction: any) {
    const value = this.cache.get(key);
    if (value) {
      console.log(`Data for ${key} found.`);
      return Promise.resolve(value);
    }

    console.log(`Data for ${key} not found. Requesting data from JHU repo`);
    return storeFunction()
      .then(result => {
        console.log(`Data loaded. Cached into ${key}`);
        let transformed = transformDateData(result.data);
        this.cache.set(key, transformed);
        return transformed;
      })
      .catch(err => []);
  }

  del(keys: any) {
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
