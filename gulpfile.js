var gulp = require('gulp'),
    env = require('gulp-env'),
    path = require('path'),
    webpack = require('webpack-stream'),
    ghPages =  require('gulp-gh-pages'),
    rimraf = require('rimraf');

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

var stages = ['staging', 'production', 'tpp_rates'];
stages.forEach(function(stage) {
  gulp.task('clean:' + stage, function(done) {
    var config = require('./webpack.config.' + stage);
    rimraf(config.output.path, done);
  });

  gulp.task('build:' + stage, ['clean:' + stage], function(done) {
    return build(stage);
  });

  gulp.task('deploy:' + stage, ['build:' + stage, 'github'], function(done) {
    return gulp.src(path.join(__dirname, 'dist', '**/*'), { dot: true })
      .pipe(ghPages());
  });
});

gulp.task('clean', ['clean:staging']);
gulp.task('build', ['build:staging']);
gulp.task('deploy', ['deploy:staging']);

gulp.task('start', function() {
  var devServer = require('./task/server');
  var config = require('./webpack.config.development');
  devServer(config);
});

gulp.task('github', function() {
  gulp.src(path.join(__dirname, 'public', 'index.html'))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
  return gulp.src(path.join(__dirname, '.gitignore'), { dot: true })
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('lint', function() {
  var eslint = require('gulp-eslint');
  return gulp.src(path.join(__dirname, 'src/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
