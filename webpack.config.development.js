var path = require('path');
var webpack = require('webpack');
var assign = require('object-assign');
var bourbon = require('node-bourbon').includePaths;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  index: path.join(__dirname, 'index.html'),
  output: {
    path: path.join(__dirname, 'dist', 'development'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        TRADE_API: {
          KEY: JSON.stringify('0ooVzDG3pxt0azCL9uUBMYLS'),
          HOST: JSON.stringify('https://api.govwizely.com')
        }
      }
    }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') })
  ],
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
      loader: 'style!css!sass?includePaths[]=' + bourbon
    }]
  }
};
