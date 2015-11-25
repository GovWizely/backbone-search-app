module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai'],

    reporters: ['nyan'],

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
    }
  });
};
