import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const uri = process.env.API_URL;
const link = new HttpLink({ uri });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrMode: true
});
export default client;
