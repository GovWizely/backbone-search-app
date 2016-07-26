var devServer = require('./task/server');
var config = require('./sites/development/webpack.config');
devServer(config);
