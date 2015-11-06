module.exports = function(gulp, config) {
  gulp.task('image', function() {
    return gulp.src(config.paths.image)
      .pipe(gulp.dest(config.dist.image));
  });
};
