import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import StartServerPlugin from "start-server-webpack-plugin";

const config = {
  name: "server",
  mode: "development",
  target: "node",
  externals: nodeExternals({
    whitelist: ["webpack/hot/poll?1000"]
  }),
  entry: ["webpack/hot/poll?1000", "../../../src/server/server.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    publicPath: "/assets/",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new StartServerPlugin({ name: "server.js", nodeArgs: ["--inspect"] }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BUILD_TARGET: JSON.stringify("server")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "src/"),
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", { modules: "false" }],
            "@babel/preset-react"
          ],
          plugins: [
            [
              "@babel/plugin-proposal-object-rest-spread",
              { useBuiltIns: true }
            ],
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: "ignore-loader"
      },
      {
        test: /\.css$/,
        loader: "ignore-loader"
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};

export default config;
