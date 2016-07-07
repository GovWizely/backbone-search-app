var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var root = path.resolve(__dirname, '../..');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  index: path.join(__dirname, 'index.html'),
  output: {
    path: path.join(root, 'dist', 'development'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(root, 'src')
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.scss$/i,
      loader: 'style!css!sass?includePaths[]=' + bourbon
    }]
  }
};
