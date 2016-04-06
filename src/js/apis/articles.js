import assign from 'object-assign';
import { defineAPI } from './utils.js';

function transformParams(_params) {
  const params = assign({}, _params);
  if (params.offset && (params.offset < 0 || params.offset > 999)) {
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
  endpoint: 'https://intrasearch.export.gov/v1/articles/search',
  permittedParams: ['q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'],
  transformParams
});
