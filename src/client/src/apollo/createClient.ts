import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
const uri = process.env.API_URL;

const client = new ApolloClient({
  uri,
  // @ts-ignore
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});
export default client;
