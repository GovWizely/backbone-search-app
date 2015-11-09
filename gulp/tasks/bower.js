var bower = require('gulp-bower');

module.exports = function(gulp, config) {
  gulp.task('bower', function() {
    return bower()
      .pipe(gulp.dest(config.paths.bower));
  });
};
