import { defineAPI } from './utils.js';

module.exports = defineAPI('articles', {
  aggregations: {
    countries: { type: 'array' },
    industries: { type: 'tree' }
  },
  displayName: 'Market Intelligence',
  endpoint: 'https://pluto.kerits.org/v1/articles/search',
  permittedParams: ['q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'],
  maxOffset: 1000
});
