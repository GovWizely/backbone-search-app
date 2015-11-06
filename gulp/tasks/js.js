var browserify = require('browserify'),
    envify = require('envify/custom'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, config) {
  var b = browserify({
    entries: [config.paths.entry]
  });
  if (config.js.envify) {
    b = b.transform(envify(config.js.envify));
  }
  gulp.task('js', function() {
    return b.bundle()
      .pipe(source(config.dist.js))
      .pipe(buffer())
      .pipe(config.env.production ? sourcemaps.init() : util.noop())
      .pipe(config.env.production ? uglify() : util.noop())
      .pipe(config.env.production ? sourcemaps.write() : util.noop())
      .pipe(gulp.dest(config.dist.root));
  });
};
