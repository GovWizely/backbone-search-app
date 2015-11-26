module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai'],

    reporters: ['mocha'],

    browsers: ['Chrome'],

    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    },
    browserDisconnectTimeout: 1000,
    browserNoActivityTimeout: 100000
  });
};
