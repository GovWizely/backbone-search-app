var gulp = require('gulp'),
    path = require('path'),
    assign = require('object-assign'),
    history = require('connect-history-api-fallback'),
    watchify = require('watchify'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence');

var defaultConfig = require('./config.default');

var dist = path.resolve(__dirname, '../tmp');

module.exports = function() {
  var config = assign({}, defaultConfig, {
    default: true, // cmd is `gulp build` instead of gulp build:{env} when default is true
    env: 'development',
    dist: {
      root: dist,
      font: path.resolve(dist, 'fonts'),
      image: path.resolve(dist, 'images'),
      style: path.resolve(dist, 'css'),
      bundle: 'js/bundle.js'
    },
    envify: {
      NODE_ENV: 'development'
    },
    karma: {
      conf: path.resolve(__dirname, '../karma.conf.js')
    },
    serverStream:  browserSync.stream
  });

  var lint = require('./tasks/lint')(gulp, config),
      test = require('./tasks/test')(gulp, config),
      build = require('./tasks/build')(gulp, config);

  gulp.task('server', function() {
    browserSync.init({
      baseDir: config.dist.root,
      server: {
        baseDir: config.dist.root,
        middleware: [history()]
      }
    });
  });

  gulp.task('watch', ['build'], function() {
    runSequence('server', ['font:watch', 'html:watch', 'sass:watch', 'js:watch', 'image:watch']);
  });
};
