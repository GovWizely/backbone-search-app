var path = require('path');
var express = require('express');
var webpack = require('webpack');

module.exports = function(config) {
  var app = express();
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    res.sendFile(config.index);
  });

  app.listen(4004, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:4004');
  });
};
