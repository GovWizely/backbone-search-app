var ghPages = require('gulp-gh-pages');

module.exports = function(gulp, config) {
  var build = require('./build')(gulp, config);

  gulp.task('deploy', ['build:production'], function() {
    return gulp.src(config.dist.root + '/**/*')
      .pipe(ghPages());
  });
};
