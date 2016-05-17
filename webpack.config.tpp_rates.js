var createWebpackConfig = require('./webpack.config.helper.js').createWebpackConfig;

module.exports = createWebpackConfig('tpp_rates', {
  tradeAPIKey: 'Z48wSr3E3nNN4itDUvE4Clje',
  tradeAPIHost: 'https://api.govwizely.com'
});
