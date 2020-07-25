import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import apolloServer from "./middlewares/graphql/apolloServer";
import ssr from "./middlewares/ssr";

type ServerArgs = {
  mode: "production" | "development";
  config: Partial<webpack.Configuration>;
};

const expressServer = ({ mode, config }: ServerArgs) => {
  const app = express();
  app.use(express.static(path.join(__dirname, "build")));

  if (mode === "development") {
    // @ts-ignore
    config.entry.main[1] = path.resolve(__dirname, "../client/index.tsx");
    config.output.path = path.resolve(__dirname, "./build");
    const compiler = webpack(config);
    app.use(
      webpackDevMiddleware(compiler, {
        serverSideRender: true,
        writeToDisk: true,
        publicPath: config.output.publicPath,
      })
    );

    app.use(
      webpackHotMiddleware(compiler, {
        log: false,
      })
    );
  }
  apolloServer.applyMiddleware({ app });
  app.use(ssr);
  return app;
};

export default expressServer;
