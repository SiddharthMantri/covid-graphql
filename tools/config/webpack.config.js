import path from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { clientConfig } from "./webpack.conf";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

export const buildConfig = {
  mode: "production",
  entry: "../../src/client/index.tsx",
  output: clientConfig.output,
  devtool: false,
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  module: clientConfig.module,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.API_URL": "/graphql"
    })
  ]
};
