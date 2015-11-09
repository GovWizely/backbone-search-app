var eslint = require('gulp-eslint');

module.exports = function(gulp, config) {
  gulp.task('lint', function() {
    return gulp.src(config.js.path)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
};
