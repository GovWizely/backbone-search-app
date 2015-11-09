module.exports = function(gulp, config) {
  gulp.task('font', function() {
    return gulp.src(config.paths.font)
      .pipe(gulp.dest(config.dist.font));
  });
};
