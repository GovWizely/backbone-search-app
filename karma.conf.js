module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai'],

    browser: ['Chrome'],

    files: [
      'src/js/**/*.js',
      'test/**/*.js'
    ],

    reporters: ['mocha'],

    preprocessors: {
      'src/js/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']

    },

    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    }
  });
};
