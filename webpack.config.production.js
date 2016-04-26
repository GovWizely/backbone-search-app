var createWebpackConfig = require('./webpack.config.helper.js').createWebpackConfig;

module.exports = createWebpackConfig('production', {
  tradeAPIKey: 'hSLqwdFz1U25N3ZrWpLB-Ld4',
  tradeAPIHost: 'https://api.trade.gov'
});
