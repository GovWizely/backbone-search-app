var createWebpackConfig = require('./webpack.config.helper.js').createWebpackConfig;

module.exports = createWebpackConfig('tpp_rates', {
  tradeAPIKey: '0ooVzDG3pxt0azCL9uUBMYLS',
  tradeAPIHost: 'https://api.govwizely.com'
});
