const webpackConfig = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

webpackConfig.mode = "production";

webpackConfig.module.rules = webpackConfig.module.rules.concat([
  {
    test: /\.tsx?$/,
    loader: "ifdef-loader",
    options: {
      PRODUCTION: true,
      "ifdef-verbose": true,
      "ifdef-triple-slash": false,
    },
  },
  {
    test: /\.node$/,
    loader: "node-loader",
  },
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
  new HtmlWebpackPlugin({
    template: "./template/index.prod." + process.env.NODE_ENV.trim() + ".html",
    inject: false,
  }),
]);

module.exports = webpackConfig;
