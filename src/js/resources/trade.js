import * as taxonomy from '../utils/taxonomy';

function transformParams(params) {
  if (params.countries) {
    params.countries = taxonomy.countryToAbbr(params.countries);
  }
  return params;
}

function transformResponse(response) {
  if (!response.aggregations) { return response; }

  for (let i in response.aggregations.countries) {
    response.aggregations.countries[i].key =
      taxonomy.abbrToCountry(response.aggregations.countries[i].key);
  }
  return response;
}

function endpoint(path) {
  const tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';
  return `https://api.trade.gov/${path}/search?api_key=${tradeAPIKey}`;
}

const tradeAPI = {
  aggregations: {
    countries: { type: 'array' },
    sources: { type: 'array' }
  },
  metadata: ['total', 'offset', 'sources_used', 'search_performed_at'],
  permittedParams: ['q', 'countries', 'industries', 'sources', 'start_date', 'end_date', 'size', 'offset'],
  transformParams,
  transformResponse
};

export default {
  trade_events:  Object.assign({}, tradeAPI, {
    displayName: 'Trade Event',
    endpoint: endpoint('trade_events'),
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
    endpoint: endpoint('trade_leads'),
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
