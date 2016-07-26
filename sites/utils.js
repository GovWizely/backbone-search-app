const path = require('path');
const webpack = require('webpack');
const bourbon = require('node-bourbon').includePaths;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createWebpackConfig({ env, site }) {
  const root = path.resolve(__dirname, '..');
  const dirname = path.resolve(__dirname);

  return {
    devtool: 'source-map',
    entry: [
      'babel-polyfill',
      './src/index'
    ],
    index: path.join(dirname, site, 'index.html'),
    output: {
      path: path.join(root, 'dist', site, env),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('app.css'),
      new HtmlWebpackPlugin({ template: path.join(dirname, site, 'index.html') })
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
        loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=' + bourbon)
      }]
    }
  };
}

function createWebpackDevelopmentConfig({ site }) {
  const root = path.resolve(__dirname, '..');
  const dirname = path.resolve(__dirname);

  return {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/index'
    ],
    index: path.join(dirname, site, 'index.html'),
    output: {
      path: path.join(root, 'dist', site, 'development'),
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
      new HtmlWebpackPlugin({ template: path.join(dirname, site, 'index.html') })
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
        loader: `style!css!sass?includePaths[]=${bourbon}`
      }]
    }
  };
}

module.exports = {
  createWebpackConfig,
  createWebpackDevelopmentConfig
};
