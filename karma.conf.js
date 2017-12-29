module.exports = function (config) {
  var configuration = {
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './spec/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      "./spec/*.spec.js": ["webpack"]
    },
    // webpack configuration
    webpack: require("./webpack.config.js"),
    webpackMiddleware: {
      stats: "errors-only"
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeWithoutSecurity'],
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    concurrency: Infinity
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};