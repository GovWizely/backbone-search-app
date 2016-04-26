import assign from 'object-assign';
import * as taxonomy from '../utils/taxonomy';
import { defineAPI } from './utils';

function transformParams(params) {
  if (!params.countries) return params;

  return assign({}, params, {
    countries: taxonomy.countryToAbbr(params.countries)
  });
}

function transformResponse(response) {
  if (!response.aggregations || !response.aggregations.countries) return response;

  const countries = [];
  for (const country of response.aggregations.countries) {
    countries.push({ key: taxonomy.abbrToCountry(country.key) });
  }
  return assign(
    {}, response, {
      aggregations: assign({}, response.aggregations, { countries })
    }
  );
}

function tppRatesTransformParams(params) {
  if (!params.partners) return params;

  return assign({}, params, {
    sources: taxonomy.countryToAbbr(params.partners)
  });
}

function tppRatesTransformResponse(response) {
  if (response.results.length === 0) return response;

  const partners = [];
  for (const { source } of response.sources_used) {
    const country = source.slice(0, -10);
    if (country) partners.push({ key: country });
  }
  return assign({}, response, { aggregations: { partners } });
}

function endpoint(path) {
  const { KEY: tradeAPIKey, HOST: tradeAPIHost } = process.env.TRADE_API;
  return `${tradeAPIHost}/${path}/search?api_key=${tradeAPIKey}`;
}

function defineTradeAPI(key, attributes = {}) {
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
  }),
  defineTradeAPI('tpp_rates', {
    aggregations: {
      partners: { type: 'array' }
    },
    deckable,
    endpoint: endpoint('v1/tpp_rates'),
    permittedParams: ['q', 'sources', 'start_date', 'end_date', 'size', 'offset'],
    transformParams: tppRatesTransformParams,
    transformResponse: tppRatesTransformResponse
  })
);
