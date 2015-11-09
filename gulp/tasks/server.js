var browserSync = require('browser-sync');

module.exports = function(gulp, config) {
  gulp.task('server', function() {
    browserSync({
      baseDir: config.dist.root,
      server: {
        baseDir: config.dist.root,
        middleware: config.server.middlewares
      }
    });
  });
};
