module.exports = function (config) {
  const configuration = {
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: ['./spec/*.spec.js'],
    exclude: [],
    preprocessors: {
      "./spec/*.spec.js": ["webpack"]
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
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false,
    concurrency: Infinity
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};