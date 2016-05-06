import assign from 'object-assign';
import { defineAPI } from './utils.js';

function transformParams(_params) {
  const params = assign({}, _params);
  if (params.offset && (params.offset < 0 || params.offset > 999)) {
    params.offset = 0;
  }
  return params;
}

function endpoint(path) {
  const { host } = process.env.apis.articles;
  return `${host}/${path}/search`;
}

module.exports = assign(
  {},
  defineAPI('articles', {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' }
    },
    displayName: 'Market Intelligence',
    endpoint: endpoint('market_intelligence_articles'),
    permittedParams: ['q', 'countries', 'industries', 'topics', 'trade_regions', 'offset'],
    transformParams
  }),
  defineAPI('how_to_articles', {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' }
    },
    displayName: 'How To Export',
    endpoint: endpoint('how_to_articles'),
    permittedParams: [
      'q', 'countries', 'industries', 'topics', 'trade_regions', 'world_regions', 'offset'
    ],
    transformParams
  })
);
