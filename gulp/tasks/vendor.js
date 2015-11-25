var util = require('gulp-util'),
    taskName = require('../taskname.js');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('vendor:build', config);
  var watchTaskName = taskName('vendor:watch', config);

  gulp.task(buildTaskName, function() {
    return gulp.src(config.vendor.files)
      .pipe(gulp.dest(config.dist.vendor))
      .pipe(config.serverStream ? config.serverStream() : util.noop());
  });

  gulp.task(watchTaskName, function() {
    gulp.watch(config.vendor.path, [buildTaskName]);
  });
};
