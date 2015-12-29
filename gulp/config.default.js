var path = require('path');

var bower = path.resolve(__dirname, '../bower_components');
var src   = path.resolve(__dirname, '../src');
var test   = path.resolve(__dirname, '../test/**/*.js');

module.exports = {
  bower: {
    path: bower
  },
  src: {
    path: src
  },
  test: {
    path: test
  },
  entry: {
    path: path.resolve(src, 'index.js')
  },
  html: {
    path: path.resolve(src, 'index.html')
  },
  sass: {
    path: path.resolve(src, 'scss/**/*.scss')
  },
  font: {
    path: path.resolve(src, 'fonts/**/*')
  },
  image: {
    path: path.resolve(src, 'images/**/*')
  },
  js: {
    path: path.resolve(src, 'js/**/*.js')
  },
  vendor: {
    files: [
      'bower_components/html5shiv/dist/html5shiv.min.js',
      'bower_components/es5-shim/es5-shim.min.js',
    ]
  }
};
