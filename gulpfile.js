var gulp = require('gulp'),
    env = require('gulp-env'),
    path = require('path'),
    webpack = require('webpack-stream');

function build(stage) {
  var config = require('./webpack.config.' + stage);
  const envs = env.set({
    NODE_ENV: stage
  });
  return gulp.src(config.entry)
    .pipe(envs)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path));
}

function clean(cb, stage) {
  var rimraf = require('rimraf');
  var config = require('./webpack.config.' + stage);
  rimraf(config.output.path, cb);
}

gulp.task('start', function() {
  var devServer = require('./task/server');
  var config = require('./webpack.config.development');
  devServer(config);
});

gulp.task('build', ['build:staging', 'build:production']);

gulp.task('build:production', ['clean:production'], function() {
  return build('production');
});

gulp.task('clean:production', function(cb) {
  return clean(cb, 'staging');
});

gulp.task('build:staging', ['clean:staging'], function() {
  return build('staging');
});

gulp.task('clean:staging', function(cb) {
  return clean(cb, 'staging');
});


gulp.task('build:tpp_rates', ['clean:tpp_rates'], function() {
  return build('tpp_rates');
});

gulp.task('clean:tpp_rates', function(cb) {
  return clean(cb, 'tpp_rates');
});

gulp.task('github', function() {
  gulp.src(path.join(__dirname, 'public', 'index.html'))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
  gulp.src(path.join(__dirname, '.gitignore'))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('deploy', ['build', 'github'], function() {
  var ghPages = require('gulp-gh-pages');
  return gulp.src(path.join(__dirname, 'dist', '**/*'))
    .pipe(ghPages());
});

gulp.task('deploy:tpp_rates', ['build:tpp_rates', 'github'], function() {
  var ghPages = require('gulp-gh-pages');
  return gulp.src(path.join(__dirname, 'dist', '**/*'))
    .pipe(ghPages());
});

gulp.task('deploy:staging', ['build:staging', 'github'], function() {
  var ghPages = require('gulp-gh-pages');
  return gulp.src(path.join(__dirname, 'dist', '**/*'))
    .pipe(ghPages());
});

gulp.task('deploy:production', ['build:production', 'github'], function() {
  var ghPages = require('gulp-gh-pages');
  return gulp.src(path.join(__dirname, 'dist', '**/*'))
    .pipe(ghPages());
});

gulp.task('lint', function() {
  var eslint = require('gulp-eslint');
  return gulp.src(path.join(__dirname, 'src/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
