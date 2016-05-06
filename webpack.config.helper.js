var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function createWebpackConfig(env, options) {
  var dirname = __dirname;

  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      './src/index'
    ],
    index: path.join(dirname, 'index.html'),
    output: {
      path: path.join(dirname, 'dist', env),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env),
          apis: options.apis
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('app.css'),
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
        loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=' + bourbon)
      }]
    }
  };
}

module.exports = {
  createWebpackConfig: createWebpackConfig
};
