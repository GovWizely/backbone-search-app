var createWebpackConfig = require('./webpack.config.helper.js').createWebpackConfig;

module.exports = createWebpackConfig('staging', {
  apis: {
    articles: {
      host: JSON.stringify('https://intrasearch.govwizely.com/v1')
    },
    trade: {
      host: JSON.stringify('https://api.govwizely.com'),
      key: JSON.stringify('Z48wSr3E3nNN4itDUvE4Clje')
    }
  }
});
