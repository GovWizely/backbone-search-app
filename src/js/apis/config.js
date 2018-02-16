if (process.env.NODE_ENV === 'production') {
  module.exports = {
    articles: {
      host: 'https://intrasearch.export.gov/v1'
    },
    trade: {
      host: 'https://api.trade.gov',
      key: 'hSLqwdFz1U25N3ZrWpLB-Ld4'
    }
  };
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    articles: {
      host: 'https://intrasearch.govwizely.com/v1'
    },
    trade: {
      host: 'https://api.govwizely.com',
      key: 'Z48wSr3E3nNN4itDUvE4Clje'
    }
  };
} else {
  module.exports = {
    articles: {
      host: 'https://intrasearch.govwizely.com/v1'
    },
    trade: {
      host: 'https://api.govwizely.com',
      key: 'Z48wSr3E3nNN4itDUvE4Clje'
    }
  };
}
