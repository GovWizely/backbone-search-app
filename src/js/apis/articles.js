import assign from 'object-assign';
import { defineAPI } from './utils';
import { articles } from './config';

function transformParams(_params) {
  const params = assign({}, _params);
  if (params.offset && (params.offset < 0 || params.offset > 999)) {
    params.offset = 0;
  }
  return params;
}

function webDocumentTransformParams(_params) {
  return assign(transformParams(_params), { domains: 'success.export.gov' });
}

function endpoint(path) {
  const { host } = articles;
  return `${host}/${path}/search`;
}

function defineArticleAPI(key, attributes = {}) {
  const articleAPI = {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' },
      topics: { type: 'tree' }
    },
    endpoint: endpoint(key),
    permittedParams: [
      'q', 'countries', 'industries', 'topics',
      'trade_regions', 'world_regions', 'offset', 'limit'
    ],
    transformParams
  };
  return defineAPI(key, assign({}, articleAPI, attributes));
}

module.exports = assign(
  {},
  defineArticleAPI('articles', {
    displayName: 'Market Intelligence',
    endpoint: endpoint('market_intelligence_articles')
  }),
  defineArticleAPI('how_to_articles', {
    displayName: 'How To Export',
    endpoint: endpoint('how_to_export_articles')
  }),
  defineArticleAPI('web_documents', {
    card: {
      count: 3,
      enable: true,
      footer: 'See More',
      header: 'Recommended',
      mode: 'horizontal'
    },
    displayName: 'Recommended',
    permittedParams: ['q', 'domains', 'offset', 'limit'],
    transformParams: webDocumentTransformParams
  }),
  defineArticleAPI('trade_events', {
    shortName: 'Events'
  })
);
