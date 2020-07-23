import expressServer from "../../../src/server";
import { clientConfig } from "../../config/webpack.conf";


const port = process.env.PORT || 8080;

const startDevServer = () => {
  const server = expressServer({
    // @ts-ignore
    config: clientConfig,
    mode: "development",
  });

  server.listen(port, (...cb) => {
    if (cb && cb.length) {
      console.log(cb);
    }
    console.log(`Listening on: ${port}`);
  });
};

startDevServer();
