import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground as GqlPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "../schema";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [GqlPlayground],
});

export default apolloServer;
