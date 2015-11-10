var util = require('gulp-util'),
    taskName = require('../taskname.js');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('font:build', config);
  var watchTaskName = taskName('font:watch', config);

  gulp.task(buildTaskName, function() {
    return gulp.src(config.font.path)
      .pipe(gulp.dest(config.dist.font))
      .pipe(config.serverStream ? config.serverStream() : util.noop());
  });

  gulp.task(watchTaskName, function() {
    gulp.watch(config.font.path, [buildTaskName]);
  });
};
