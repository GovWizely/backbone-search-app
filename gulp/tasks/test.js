require('babel-core/register');

var _ = require('lodash');
var mocha = require('gulp-mocha');
var mochify = require('mochify');
var babelify = require('babelify');
var path = require('path');
var argv = require('yargs').argv;



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

  gulp.task('test:single', function(done) {
    var files = config.test.path;
    if (argv.file) {
      files = _.isArray(argv.file) ? argv.file : [argv.file];
    }
    gulp.src(files, { read: false })
      .pipe(mocha({ reporter: 'spec' }))
      .once('error', function() {
        process.exit();
      })
      .once('end', function() {
        process.exit();
      });
  });
};
