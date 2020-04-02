import ApolloClient from "apollo-boost";
import dotenv from "dotenv";
const env = dotenv.config().parsed;
const uri =
  env && env.production !== undefined
    ? "/graphql"
    : "http://localhost:8080/graphql";

const client = new ApolloClient({
  uri
});
export default client;
