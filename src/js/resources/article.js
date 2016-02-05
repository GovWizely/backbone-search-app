import { setup } from '../utils/resource-helper';

export default setup('articles', {
  aggregations: {
    countries: { type: 'array' },
    industries: { type: 'tree' },
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
  permittedParams: ['q', 'countries', 'industries', 'topics', 'types', 'offset'],
  maxOffset: 1000
});
