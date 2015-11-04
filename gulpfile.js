require('babel-core/register');

var _           = require('lodash'),
    del         = require('del'),
    gulp        = require('gulp'),
    gulpUtil    = require('gulp-util'),
    ghPages     = require('gulp-gh-pages'),
    browserify  = require('browserify'),
    envify      = require('envify/custom'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass'),
    bower       = require('gulp-bower'),
    watchify    = require('watchify'),
    uglify      = require('gulp-uglify'),
    babelify    = require('babelify'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync'),
    history     = require('connect-history-api-fallback'),
    Karma       = require('karma').Server;

var config = {
  sourcePath: './src',
  distPath: './dist',
  bowerDir: './bower_components'
};

var env = {

};

var log = {
  init: function(message) {
    gulpUtil.colors.yellow('[❗] ' + message);
  },
  error: function(message) {
    gulpUtil.colors.red('[✖] ' + message);
  },
  success: function(message) {
    gulpUtil.colors.green('[✔] ' + message);
  }
};

gulp.task('test', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:watch', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('browser-sync', ['build'], function() {
  browserSync({
    baseDir: config.distPath,
    server: {
      baseDir: config.distPath,
      middleware: [history()]
    }
  });
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icon-build', function() {
  return gulp.src(config.bowerDir + '/components-font-awesome/fonts/**.*')
    .pipe(gulp.dest(config.distPath + '/fonts'));
});

gulp.task('image-build', function() {
  return gulp.src(config.sourcePath + '/images/**/*')
    .pipe(gulp.dest(config.distPath + '/images'));
});

var scss = {
  build: function() {
    log.init("Building scss");
    return gulp.src(config.sourcePath + '/scss/**/*.scss')
      .pipe(
        sass({
          style: 'compressed',
          loadPath: [
            config.bowerDir + '/bootstrap-sass/assets',
            config.bowerDir + '/components-font-awesome/scss',
          ]
        }).on("error", function(error) { log.error(error); })
      )
      .pipe(gulp.dest(config.distPath + '/css'))
      .on('end', function() { log.success('Completed scss build.'); });
  },
  reload: function() {
    return scss
      .build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    return gulp.watch(config.sourcePath + '/scss/**/*.scss', scss.build);
  }
};

gulp.task('scss-build', scss.build);
gulp.task('scss-reload', scss.reload);
gulp.task('scss-watch', ['browser-sync'], scss.watch);

var html = {
  build: function () {
    log.init("Building html");
    return gulp.src(config.sourcePath + '/index.html')
      .pipe(wiredep({ ignorePath: config.distPath }))
      .pipe(gulp.dest(config.distPath))
      .on('end', function() { log.success('Completed html build.'); });
  },
  reload: function () {
    return html.build()
      .pipe(browserSync.stream());
  },
  watch: function () {
    return gulp.watch('src/index.html', html.reload);
  }
};

gulp.task('html-build', html.build);
gulp.task('html-reload', html.reload);
gulp.task('html-watch', ['browser-sync'], html.watch);

var js = {
  b: browserify({
    entries: [config.sourcePath + '/index.js'],
    cache: {},
    packageCache: {}
  }),
  build: function(__, browserified) {
    var b = browserified || js.b;
    return b
      .transform(babelify, { })
      .bundle()
      .on('error', function(error) {
        log.error(error);
      })
      .pipe(source('js/bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.distPath));
  },
  reload: function() {
    return js
      .build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    watchify(js.b)
      .on('update', js.reload)
      .on('time', function(time) {
        log.success("Finished JS build in: ", gulpUtil.colors.cyan(time + 'ms'));
      });
    return js.reload();
  }
};

gulp.task('js-build', function() {
  js.build(js.b.transform(envify({ NODE_ENV: 'development' })));
});
gulp.task('js-reload', js.reload);
gulp.task('js-watch', ['browser-sync'], js.watch);

gulp.task('deploy', function() {
  js.build(js.b.transform(envify({ NODE_ENV: 'production' })));
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('setup', [
  'bower',
  'build'
]);

gulp.task('build', [
  'icon-build',
  'image-build',
  'scss-build',
  'html-build',
  'js-build'
]);

gulp.task('watch', [
  'html-watch',
  'js-watch',
  'scss-watch'
]);
