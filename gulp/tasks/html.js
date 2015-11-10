var util = require('gulp-util'),
    taskName = require('../taskname.js');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('html:build', config);
  var watchTaskName = taskName('html:watch', config);

  gulp.task(buildTaskName, function() {
    return gulp.src(config.html.path)
      .pipe(gulp.dest(config.dist.root))
      .pipe(config.serverStream ? config.serverStream() : util.noop());
  });

  gulp.task(watchTaskName, function() {
    gulp.watch(config.html.path, [buildTaskName]);
  });
};
