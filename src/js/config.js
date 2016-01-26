const tradeAPI = {
  aggregations: {
    countries: { type: 'array' },
    sources: { type: 'array' }
  },
  metadata: ['total', 'offset', 'sources_used', 'search_performed_at'],
  permittedParams: ['q', 'countries', 'industries', 'sources', 'start_date', 'end_date', 'size', 'offset']
};
function tradeEndpoint(path) {
  const tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';
  return `https://api.trade.gov/${path}/search?api_key=${tradeAPIKey}`;
}

export const resources = {
  articles: {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' },
      topics: { type: 'tree' },
      types: { type: 'array' }
    },
    displayName: 'International Trade Administration',
    endpoint: 'https://pluto.kerits.org/v1/articles/search',
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      title: ['title'],
      url: ['url']
    },
    pathname: 'articles',
    permittedParams: ['q', 'countries', 'industries', 'topics', 'types', 'offset'],
    stateKey: 'article',
    maxOffset: 1000
  },
  trade_events:  Object.assign({}, tradeAPI, {
    aggregations: {
      countries: {
        type: 'array'
      },
      sources: {
        type: 'array'
      }
    },
    displayName: 'Trade Event',
    endpoint: tradeEndpoint('trade_events'),
    fields: {
      key: ['id', 'event_name'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['event_name'],
      url: ['url', 'registration_link']
    },
    pathname: 'trade_events',
    stateKey: 'tradeEvent'
  }),
  trade_leads: Object.assign({}, tradeAPI, {
    displayName: 'Trade Lead',
    endpoint: tradeEndpoint('trade_leads'),
    fields: {
      key: ['id', 'title', 'description'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['title', 'description'],
      url: ['url']
    },
    pathname: 'trade_leads',
    stateKey: 'tradeLead'
  })
};
