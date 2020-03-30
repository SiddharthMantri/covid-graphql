const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./client/public/index.html"
});

const clientConfig = {
  entry: "./client/src/index.js",
  devtool: "inline-source-map",
  devServer: {
    port: 9000
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
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
  plugins: [htmlPlugin]
};


module.exports = [clientConfig]
