var js = require('./tasks/js'),
    gulp = require('gulp'),
    path = require('path'),
    lint = require('./tasks/lint'),
    sass = require('./tasks/sass'),
    font = require('./tasks/font'),
    html = require('./tasks/html'),
    image = require('./tasks/image'),
    bower = require('./tasks/bower'),
    server = require('./tasks/server');

var paths = {
  src: path.resolve(__dirname, '/../src'),
  bower: path.resolve(__dirname, '/../bower_components'),
  dist: path.resolve(__dirname, '/../tmp')
};

var config = {
  env: 'development',
  paths: {
    sass: paths.src + '/scss/**/*.scss',
    font: paths.bower + '/components-font-awesome/fonts/**.*',
    html: paths.src + '/index.html',
    image: paths.src + '/images/**/*',
    bower: paths.bower
  },
  dist: {
    root: paths.dist,
    style: paths.dist + '/css',
    bundle: 'js/bundle.js'
  },
  custom: {
    sass: {
      loadPaths: [
        paths.bower + '/bootstrap-sass/assets',
        paths.bower + '/components-font-awesome/scss'
      ]
    }
  }
};

module.exports = function() {

};
