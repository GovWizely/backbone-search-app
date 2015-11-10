var Karma = require('karma').Server;

module.exports = function(gulp, config) {
  gulp.task('test', function(done) {
    new Karma({
      configFile: config.karma.conf,
      singleRun: true
    }, done).start();
  });

  gulp.task('test:watch', function(done) {
    new Karma({
      configFile: config.karma.conf
    }, done).start();
  });
};
