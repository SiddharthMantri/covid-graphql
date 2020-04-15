import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

export const clientConfig = {
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "../../src/client/index.tsx"
    ]
  },
  output: {
    path: path.resolve(__dirname, "../../src/server/build"),
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".mjs", ".tsx", ".ts", ".js", ".json"]
  },
  mode: "development",
  target: "web",
  devtool: "#source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "../../src/"),
          // path.resolve(__dirname, "../../src/")
        ],
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
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "../../src/"),
          // path.resolve(__dirname, "../../src/shared/")
        ],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

export const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    server: "./src/server/server.tsx"
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "server.js"
  },
  node: {
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
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
      }
    ]
  }
};
