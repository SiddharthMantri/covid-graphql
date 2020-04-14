import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import server from "../../../src/server/server";
import http from "http";
import path from "path";

import { clientConfig, serverConfig } from "../../config/webpack.conf";
import {
  expressRenderer,
  apolloServer
} from "../../../src/server/express/serverUtils";

clientConfig.entry.main[1] = path.resolve(
  __dirname,
  "../../../src/client/index.tsx"
);
clientConfig.output.path = path.resolve(__dirname, "../../../src/server/build");

const port = process.env.PORT || 8080;

// @ts-ignore
const compiler = webpack(clientConfig);
const app = http.createServer(server);
let currentServer = server;
apolloServer.applyMiddleware({ app: server });

server.use(
  webpackDevMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: true,
    publicPath: clientConfig.output.publicPath
  })
);

server.use(
  webpackHotMiddleware(compiler, {
    log: false
  })
);

//@ts-ignore
const serverCompiler = webpack(serverConfig);
server.use(
  webpackHotMiddleware(serverCompiler, {
    log: false
  })
);

server.use(expressRenderer);

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}`)
);

// @ts-ignore
if (module.hot) {
  console.log("Serving hot module replacement");
  // @ts-ignore
  module.hot.accept(() => {
    app.removeListener("request", currentServer);
    app.on("request", server);
    currentServer = server;
  });
}
