import gulp from 'gulp';
import env from 'gulp-env';
import path from 'path';
import webpack from 'webpack-stream';
import ghPages from 'gulp-gh-pages';
import rimraf from 'rimraf';

function getConfig(site, stage) {
  return require(`./sites/${site}/webpack.config.${stage}`);
}

function build(site, stage) {
  const config = getConfig(site, stage);
  const envs = env.set({
    NODE_ENV: stage
  });
  return gulp.src(config.entry)
    .pipe(envs)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path));
}

const sites = ['market_intelligence', 'tpp_rates', 'stop_fakes', 'adcvd'];
const stages = ['staging', 'production'];
sites.forEach(site => {
  stages.forEach(stage => {
    gulp.task(`clean:${site}:${stage}`, done => {
      const config = getConfig(site, stage);
      rimraf(config.output.path, done);
    });

    gulp.task(`build:${site}:${stage}`, [`clean:${site}:${stage}`], () => build(site, stage));

    gulp.task(`github:${site}:${stage}`, () => {
      gulp.src(path.join(__dirname, 'public', 'index.html'))
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
      return gulp.src(path.join(__dirname, '.gitignore'), { dot: true })
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
    });

    gulp.task(
      `deploy:${site}:${stage}`,
      [`build:${site}:${stage}`, `github:${site}:${stage}`],
      () => (
        gulp.src(path.join(__dirname, 'dist', '**/*'), { dot: true })
          .pipe(ghPages())
      ));
  });

  gulp.task(`start:${site}`, () => {
    const devServer = require('./task/server');
    const config = getConfig(site, 'development');
    devServer(config);
  });
});

gulp.task('clean', [`clean:${sites[0]}:staging`]);
gulp.task('build', [`build:${sites[0]}:staging`]);
gulp.task('deploy', [`deploy:${sites[0]}:staging`]);
gulp.task('start', [`start:${sites[0]}`]);

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
