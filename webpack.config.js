const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BUILD_DIR = "webpack-build";

const webpackDefaultConfig = {
  mode: "",
  entry: "./src/Game.ts",
  devtool: false,
  output: {
    path: path.resolve(__dirname, BUILD_DIR),
    filename: "game.js",
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_DIR], {
      root: __dirname,
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: "public",
        to: "",
      },
    ]),
    new webpack.BannerPlugin(
      "© 2021, Game, by Yvo Geldhof. All rights reserved."
    ),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

module.exports = webpackDefaultConfig;
