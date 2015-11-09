var runSequence = require('run-sequence'),
    del = require('del'),
    taskName = require('../taskname');

module.exports = function(gulp, config) {
  var buildTaskName = taskName('build', config);
  var cleanTaskName = taskName('clean', config);

  require('./js')(gulp, config);
  require('./font')(gulp, config);
  require('./html')(gulp, config);
  require('./sass')(gulp, config);
  require('./image')(gulp, config);

  gulp.task(cleanTaskName, function() {
    del(config.dist.root);
  });

  gulp.task(buildTaskName, function(callback) {
    runSequence(cleanTaskName, taskName('font:build', config), taskName(['js:build', 'html:build', 'sass:build', 'image:build'], config), callback);
  });
};
