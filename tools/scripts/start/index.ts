import server from "../../../src/server/server";
import {
  apolloServer,
  expressRenderer
} from "../../../src/server/express/serverUtils";


const port = process.env.PORT || 8080;

apolloServer.applyMiddleware({ app: server });

server.use(expressRenderer);

server.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}`)
);
