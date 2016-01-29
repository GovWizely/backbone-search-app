var path = require('path');
var webpack = require('webpack');
var assign = require('object-assign');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base');

module.exports = assign({}, base, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: base.index })
  ]
});
