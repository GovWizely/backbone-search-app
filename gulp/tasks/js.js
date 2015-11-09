var browserify = require('browserify'),
    watchify = require('watchify'),
    envify = require('envify/custom'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    taskName = require('../taskname.js');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('js:build', config);
  var watchTaskName = taskName('js:watch', config);

  var build = function() {
    return b.bundle()
      .pipe(source(config.dist.bundle))
      .pipe(buffer())
      .pipe(config.env === 'production' ? sourcemaps.init() : util.noop())
      .pipe(config.env === 'production' ? uglify() : util.noop())
      .pipe(config.env === 'production' ? sourcemaps.write() : util.noop())
      .pipe(gulp.dest(config.dist.root))
      .pipe(config.serverStream ? config.serverStream() : util.noop());
  };

  var b = browserify({
    cache: {},
    packageCache: {},
    entries: [config.entry.path]
  });
  if (config.envify) {
    b = b.transform(envify(config.envify));
  }
  gulp.task(buildTaskName, build);

  gulp.task(watchTaskName, function() {
    watchify(b)
      .on('update', build);

    return build();
  });
};
