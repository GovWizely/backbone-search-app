var path = require('path');
var bourbon = require('node-bourbon').includePaths;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  index: path.join(__dirname, 'index.html'),
  output: {
    path: path.join(__dirname, 'dist'),
//    publicPath: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.scss$/i,
      loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=' + bourbon)
      //loader: 'style!css!sass?includePaths[]=' + bourbon
    }]
  }
};
