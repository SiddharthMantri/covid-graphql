
import ApolloClient from "apollo-boost";
const uri = process.env.API_URL;

const client = new ApolloClient({
  uri
});
export default client;
