const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpackConfig = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

webpackConfig.mode = "development";

webpackConfig.module.rules = webpackConfig.module.rules.concat([
  {
    test: /\.tsx?$/,
    loader: "ifdef-loader",
    options: {
      PRODUCTION: false,
      "ifdef-verbose": true,
      "ifdef-triple-slash": false,
    },
  },
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
  new BrowserSyncPlugin({
    host: "localhost",
    port: 3000,
    server: {
      baseDir: ["webpack-build"],
    },
  }),
  new HtmlWebpackPlugin({
    template: "./template/index.dev.html",
    inject: "body",
  }),
]);

module.exports = webpackConfig;
