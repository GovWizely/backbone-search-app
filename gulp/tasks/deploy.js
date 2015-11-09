var ghPages = require('gulp-gh-pages');

module.exports = function(gulp, config) {
  gulp.task('deploy', function() {
    return gulp.src(config.dist.root + '/**/*')
      .pipe(ghPages());
  });
};
