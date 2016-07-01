var devServer = require('./task/server');
var config = require('./envs/development/webpack.config');
devServer(config);
