import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const resPath = pth => path.join(__dirname, pth);

export const clientConfig = {
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    resPath("../../src/client/index.tsx")
  ],
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "../../src/server/build"),
    publicPath: "/bundle",
    filename: "main.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  mode: "development",
  target: "web",
  devtool: "#source-map",
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

export const serverConfig = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: {
    "server.tsx": path.resolve(__dirname, "src/server/server.tsx")
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
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]"
  }
};
