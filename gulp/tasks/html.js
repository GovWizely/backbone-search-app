var wiredep = require('wiredep').stream;

module.exports = function(gulp, config) {
  gulp.task('html', function() {
    return gulp.src(config.paths.html)
      .pipe(gulp.dest(config.dist.html));
  });
};
