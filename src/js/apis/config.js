let articles = {};
let trade = {};

if (process.env.NODE_ENV === 'production') {
  articles = {
    host: 'https://intrasearch.export.gov/v1'
  };
  trade = {
    host: 'https://api.trade.gov',
    key: 'hSLqwdFz1U25N3ZrWpLB-Ld4'
  };
} else {
  articles = {
    host: 'https://intrasearch.govwizely.com/v1'
  };
  trade = {
    host: 'https://api.govwizely.com',
    key: 'Z48wSr3E3nNN4itDUvE4Clje'
  };
}

export {
  articles,
  trade
};
