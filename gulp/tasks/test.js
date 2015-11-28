var mochify = require('mochify');
var babelify = require('babelify');

var options = {
  reporter: 'spec'
};

function test(path, opts) {
  return mochify(path, opts)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle();
}

module.exports = function(gulp, config) {
  gulp.task('test', function(done) {
    test(config.test.path, options);
  });

  gulp.task('test:watch', function(done) {
    test(config.test.path, Object.assign({}, options, { watch: config.js.path }));
  });
};
