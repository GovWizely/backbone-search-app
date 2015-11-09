var util = require('gulp-util'),
    taskName = require('../taskname.js');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('image:build', config);
  var watchTaskName = taskName('image:watch', config);

  gulp.task(buildTaskName, function() {
    return gulp.src(config.image.path)
      .pipe(gulp.dest(config.dist.image))
      .pipe(config.serverStream ? config.serverStream() : util.noop());
  });

  gulp.task(watchTaskName, function() {
    return gulp.watch(config.image.path, [buildTaskName]);
  });
};
