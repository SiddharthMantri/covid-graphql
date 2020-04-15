import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import TerserPlugin from "terser-webpack-plugin";
import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const buildConfig = {
  mode: "production",
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "../../../src/server/build"),
    publicPath: "/bundle",
    filename: "main.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  devtool: false,
  target: "web",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      })
    ]
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
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()]
};

// @ts-ignore
const compiler = webpack(buildConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err.stack);
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.log(info.errors);
  }
  if (stats.hasWarnings()) {
    console.log(info.warnings);
  }
});
