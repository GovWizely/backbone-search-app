import { defineAPI } from './utils.js';

function transformParams(params) {
  if (params.offset && (params.offset < 0 || params.offset > 999) ) {
    params.offset = 0;
  }
  return params;
}

module.exports = defineAPI('articles', {
  aggregations: {
    countries: { type: 'array' },
    industries: { type: 'tree' }
  },
  displayName: 'Market Intelligence',
  endpoint: 'https://pluto.kerits.org/v1/articles/search',
  permittedParams: ['q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'],
  transformParams
});
