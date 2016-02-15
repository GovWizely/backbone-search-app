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
      sources: { type: 'array' }
    },
    endpoint: endpoint(key),
    metadata: ['total', 'offset', 'sources_used', 'search_performed_at'],
    permittedParams: ['q', 'countries', 'industries', 'sources', 'start_date', 'end_date', 'size', 'offset'],
    transformParams,
    transformResponse
  };
  return defineAPI(key, assign({}, tradeAPI, attributes));
}

const disabled = true;
module.exports = assign(
  {},
  defineTradeAPI('ita_faqs', {
    displayName: 'Frequently Asked Questions'
  }),
  defineTradeAPI('trade_events', {
  }),
  defineTradeAPI('trade_leads', {
  }),
  defineTradeAPI('consolidated_screening_list', {
    disabled
  }),
  defineTradeAPI('market_research_library', {
    disabled
  }),
  defineTradeAPI('tariff_rates', {
    disabled
  }),
  defineTradeAPI('ita_office_locations', {
    disabled
  }),
  defineTradeAPI('trade_articles', {
    disabled
  }),
  defineTradeAPI('ita_zipcode_to_post', {
    disabled
  }),
  defineTradeAPI('business_service_providers', {
    disabled
  }),
  defineTradeAPI('ita_taxonomies', {
    disabled
  }),
  defineTradeAPI('de_minimis', {
    disabled,
    endpoint: endpoint('v1/de_minimis')
  })
);
