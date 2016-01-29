// require('./gulp/gulpfile.development')();
// require('./gulp/gulpfile.production')();

var gulp = require('gulp'),
    env = require('gulp-env'),
    webpack = require('webpack-stream');

gulp.task('start', function() {
  var devServer = require('./task/server');
  var config = require('./webpack.config.development');
  devServer(config);
});

gulp.task('build', ['clean'], function() {
  var config = require('./webpack.config.production');
  const envs = env.set({
    NODE_ENV: 'production'
  });
  return gulp.src(config.entry)
    .pipe(envs)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path));
});

gulp.task('clean', function(cb) {
  var rimraf = require('rimraf');
  var config = require('./webpack.config.production');
  rimraf(config.output.path, cb);
});
