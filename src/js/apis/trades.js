import assign from 'object-assign';
import * as taxonomy from '../utils/taxonomy';
import { defineAPI } from './utils';

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

function defineTradeAPI(key, attributes={}) {
  const tradeAPI = {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' }
    },
    deckable: false,
    endpoint: endpoint(key),
    metadata: ['total', 'offset', 'sources_used', 'search_performed_at'],
    permittedParams: ['q', 'countries', 'industries', 'start_date', 'end_date', 'size', 'offset'],
    transformParams,
    transformResponse
  };
  return defineAPI(key, assign({}, tradeAPI, attributes));
}

const disabled = true;
const deckable = true;

module.exports = assign(
  {},
  defineTradeAPI('ita_faqs', {
    deckable,
    displayName: 'Frequently Asked Questions',
    shortName: 'FAQs'
  }),
  defineTradeAPI('trade_events', {
    deckable,
    shortName: 'Events'
  }),
  defineTradeAPI('trade_leads', {
    deckable,
    shortName: 'Leads'
  }),
  defineTradeAPI('consolidated_screening_list', {
  }),
  defineTradeAPI('market_research_library', {
  }),
  defineTradeAPI('tariff_rates', {
  }),
  defineTradeAPI('ita_office_locations', {
  }),
  defineTradeAPI('trade_articles', {
  }),
  defineTradeAPI('ita_zipcode_to_post', {
  }),
  defineTradeAPI('business_service_providers', {
  }),
  defineTradeAPI('ita_taxonomies', {
  }),
  defineTradeAPI('de_minimis', {
    endpoint: endpoint('v1/de_minimis')
  })
);
