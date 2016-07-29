const createWebpackConfig = require('../utils').createWebpackConfig;
const { site } = require('./config');

module.exports = createWebpackConfig({ env: 'staging', site });
