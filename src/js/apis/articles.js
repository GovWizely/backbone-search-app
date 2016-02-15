import { defineAPI } from './utils.js';

module.exports = defineAPI('articles', {
  aggregations: {
    countries: { type: 'array' },
    industries: { type: 'tree' },
    trade_regions: { type: 'array' }
  },
  displayName: 'International Trade Administration Content',
  linkDisplayName: 'International Trade Administration Market Intelligence',
  endpoint: 'https://pluto.kerits.org/v1/articles/search',
  permittedParams: ['q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'],
  maxOffset: 1000
});
