var path = require('path');
var webpack = require('webpack');
var assign = require('object-assign');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base');

module.exports = assign({}, base, {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') })
  ]
});
