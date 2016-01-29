// require('./gulp/gulpfile.development')();
// require('./gulp/gulpfile.production')();

var gulp = require('gulp'),
    webpack = require('webpack');

gulp.task('start', function() {
  var devServer = require('./task/server');
  var config = require('./webpack.config.development');
  devServer(config);
});
