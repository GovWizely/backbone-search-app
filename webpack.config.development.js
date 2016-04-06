var path = require('path');
var webpack = require('webpack');
var assign = require('object-assign');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var base = require('./webpack.config.base');

var definePlugin = new webpack.DefinePlugin({
  __TEMPLATE_DIR__: JSON.stringify(path.join(__dirname, 'src/js/templates'))
});

module.exports = assign({}, base, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({ template: base.index }),
    definePlugin
  ]
});
