import assign from 'object-assign';
import * as taxonomy from '../utils/taxonomy';
import { defineAPI } from './utils';
import { trade } from './config';

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

function queryExpansionTransformResponse(response) {
  return { results: response.query_expansion.world_regions };
}

const responseTransformers = {
  i94Cntry2015: (response) => {
    const results = response.results.map((result) => {
      const quarters = {
        qt1: result.jan + result.feb + result.mar,
        qt2: result.apr + result.may + result.jun,
        qt3: result.jul + result.aug + result.sep,
        qt4: result.oct + result.nov + result.dec
      };
      const total = quarters.qt1 + quarters.qt2 + quarters.qt3 + quarters.qt4;
      return assign(result, quarters, { total });
    });
    return assign({}, response, { results });
  }
};

function endpoint(path) {
  const { host, key } = trade;
  return `${host}/${path}?api_key=${key}`;
}

function defineTradeAPI(key, attributes = {}) {
  const tradeAPI = {
    aggregations: {
      countries: { type: 'array' },
      industries: { type: 'tree' }
    },
    endpoint: endpoint(`${key}/search`),
    metadata: ['total', 'offset', 'sources_used', 'search_performed_at'],
    permittedParams: ['q', 'countries', 'industries', 'start_date', 'end_date', 'size', 'offset'],
    transformParams,
    transformResponse
  };
  return defineAPI(key, assign({}, tradeAPI, attributes));
}

module.exports = assign(
  {},
  defineTradeAPI('ita_faqs', { // Replace by `How To` in articles API
    displayName: 'Frequently Asked Questions',
    shortName: 'FAQs'
  }),
  defineTradeAPI('trade_leads', {
    shortName: 'Leads'
  }),
  defineTradeAPI('consolidated_screening_list'),
  defineTradeAPI('market_research_library'),
  defineTradeAPI('tariff_rates'),
  defineTradeAPI('ita_office_locations'),
  defineTradeAPI('trade_articles'),
  defineTradeAPI('ita_zipcode_to_post'),
  defineTradeAPI('business_service_providers'),
  defineTradeAPI('ita_taxonomies'),
  defineTradeAPI('de_minimis', {
    endpoint: endpoint('v1/de_minimis/search')
  }),
  defineTradeAPI('tpp_rates', {
    aggregations: {
      partners: { type: 'array' }
    },
    endpoint: endpoint('v1/tpp_rates/search'),
    permittedParams: ['q', 'sources', 'start_date', 'end_date', 'size', 'offset'],
    transformParams: tppRatesTransformParams,
    transformResponse: tppRatesTransformResponse
  }),
  defineTradeAPI('query_expansion', {
    aggregations: {},
    async: true,
    bucket: { enable: false },
    card: { enable: false },
    endpoint: endpoint('ita_taxonomies/query_expansion'),
    permittedParams: ['q'],
    result: { enable: false },
    transformResponse: queryExpansionTransformResponse
  }),
  defineTradeAPI('i94_mpcty', {
    displayName: 'I-94 MPCTY',
    endpoint: endpoint('v1/i94_mpcty/search'),
    permittedParams: [], requiredParams: []
  }),
  defineTradeAPI('i94_mppoe', {
    displayName: 'I-94 MPPOE',
    endpoint: endpoint('v1/i94_mppoe/search'),
    permittedParams: ['q']
  }),
  defineTradeAPI('i94_cntry2015', {
    displayName: 'I-94 Country 2015',
    endpoint: endpoint('v1/i94_cntry2015/search'),
    permittedParams: ['q', 'offset'], requiredParams: [],
    transformResponse: responseTransformers.i94Cntry2015,
    card: { enable: false }
  })
);
