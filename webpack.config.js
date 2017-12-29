const path = require("path");
const webpack = require("webpack");

module.exports = {

  entry: {
    script: path.resolve(__dirname, "./index.js")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
    pathinfo: true
  },

  resolve: {
    extensions: [".js"],
    modules: [
      __dirname,
      path.resolve(__dirname, "./node_modules")
    ]
  }

};
