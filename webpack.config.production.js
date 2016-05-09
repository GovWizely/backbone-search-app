var createWebpackConfig = require('./webpack.config.helper.js').createWebpackConfig;

module.exports = createWebpackConfig('production', {
  apis: {
    articles: {
      host: JSON.stringify('https://intrasearch.export.gov/v1')
    },
    trade: {
      host: JSON.stringify('https://api.trade.gov'),
      key: JSON.stringify('hSLqwdFz1U25N3ZrWpLB-Ld4')
    }
  }
});
