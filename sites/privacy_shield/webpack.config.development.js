const createWebpackConfig = require('../utils').createWebpackDevelopmentConfig;
const { site } = require('./config');

module.exports = createWebpackConfig({ site });
