export default {
  articles: {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' },
      topics: { type: 'tree' },
      trade_regions: { type: 'array' },
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
  }
};
