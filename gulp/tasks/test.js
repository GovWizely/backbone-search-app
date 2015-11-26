var mochify = require('mochify');
var babelify = require('babelify');

var options = {
  reporter: 'spec'
};

module.exports = function(gulp, config) {
  gulp.task('test', function(done) {
    mochify(config.test.path, options)
      .bundle();
  });

  gulp.task('test:watch', function(done) {
    mochify(config.test.path, Object.assign({}, options, { watch: config.js.path }))
      .bundle();
  });
};
