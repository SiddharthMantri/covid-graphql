const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./client/public/index.html"
});

const clientConfig = env => {
  return {
    entry: "./client/src/index.js",
    output: {
      path: path.resolve(__dirname, "server/client/build"),
      filename: "index.js"
    },
    devtool: "inline-source-map",
    devServer: {
      port: 9000
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },
    plugins: [
      htmlPlugin,
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL)
      })
    ]
  };
};

module.exports = [clientConfig];
