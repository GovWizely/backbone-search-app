module.exports = function(gulp, config) {
  gulp.task('font', function() {
    return gulp.src(config.paths.icon)
      .pipe(gulp.dest(config.dist.font));
  });
};
