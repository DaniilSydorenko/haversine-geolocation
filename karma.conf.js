module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    files: ['./spec/*.spec.ts'],
    exclude: [],
    preprocessors: {
      "./spec/*.spec.ts": ["webpack"]
    },
    webpack: require("./webpack.config.js"),
    webpackMiddleware: {
      stats: "errors-only"
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  }

  config.set(configuration);
};
