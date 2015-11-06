var sass = require('gulp-sass');

module.exports = function(gulp, config) {
  gulp.task('sass', function() {
    return gulp.src(config.paths.sass)
      .pipe(sass({
        style: 'compressed',
        loadPath: config.customLoadPaths.sass
      }))
      .pipe(gulp.dest(config.dist.style));
  });
};
