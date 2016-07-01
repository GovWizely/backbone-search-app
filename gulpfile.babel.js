import gulp from 'gulp';
import env from 'gulp-env';
import path from 'path';
import webpack from 'webpack-stream';
import ghPages from 'gulp-gh-pages';
import rimraf from 'rimraf';

function getConfig(stage) {
  return require(`./envs/${stage}/webpack.config`);
}

function build(stage) {
  const config = getConfig(stage);
  const envs = env.set({
    NODE_ENV: stage
  });
  return gulp.src(config.entry)
    .pipe(envs)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path));
}

const stages = ['staging', 'production', 'tpp_rates'];
stages.forEach(stage => {
  gulp.task(`clean:${stage}`, done => {
    const config = getConfig(stage);
    rimraf(config.output.path, done);
  });

  gulp.task(`build:${stage}`, [`clean:${stage}`], () => build(stage));

  gulp.task(`github:${stage}`, () => {
    gulp.src(path.join(__dirname, 'public', 'index.html'))
      .pipe(gulp.dest(path.join(__dirname, 'dist')));
    return gulp.src(path.join(__dirname, '.gitignore'), { dot: true })
      .pipe(gulp.dest(path.join(__dirname, 'dist')));
  });

  gulp.task(`deploy:${stage}`, [`build:${stage}`, `github:${stage}`], () => (
    gulp.src(path.join(__dirname, 'dist', '**/*'), { dot: true })
      .pipe(ghPages())
  ));
});

gulp.task('clean', ['clean:staging']);
gulp.task('build', ['build:staging']);
gulp.task('deploy', ['deploy:staging']);

gulp.task('start', () => {
  const devServer = require('./task/server');
  const config = getConfig('development');
  devServer(config);
});

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');
  return gulp.src(path.join(__dirname, 'src/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('apis', () => {
  const apis = require('./src/js/apis').allAPIs;
  for (const key of Object.keys(apis)) {
    if ({}.hasOwnProperty.call(apis, key)) {
      console.log(key);
    }
  }
});
