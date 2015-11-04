module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai'],

    reporters: ['nyan'],

    browsers: ['Chrome'],

    files: [
      'src/js/**/*.js',
      'test/**/*.js'
    ],

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
