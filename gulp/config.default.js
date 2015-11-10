var path = require('path');

var bower = path.resolve(__dirname, '../bower_components');
var src   = path.resolve(__dirname, '../src');

module.exports = {
  bower: {
    path: bower
  },
  src: {
    path: src
  },
  entry: {
    path: path.resolve(src, 'index.js')
  },
  html: {
    path: path.resolve(src, 'index.html')
  },
  sass: {
    path: path.resolve(src, 'scss/**/*.scss'),
    loadPaths: [
      path.resolve(bower, 'bootstrap-sass/assets'),
      path.resolve(bower, 'components-font-awesome/scss')
    ]
  },
  font: {
    path: path.resolve(bower, 'components-font-awesome/fonts/**.*')
  },
  image: {
    path: path.resolve(src, 'images/**/*')
  },
  js: {
    path: path.resolve(src, 'js/**/*.js')
  }
};
