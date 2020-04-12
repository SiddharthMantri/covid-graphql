import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import server from "../../../src/server/server";
import app from "../../../src/server/testServer";

import { clientConfig, serverConfig } from "../../config/webpack.conf";

// @ts-ignore
const compiler = webpack(clientConfig);

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
