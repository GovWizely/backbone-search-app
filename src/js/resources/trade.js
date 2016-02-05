import assign from 'object-assign';
import * as taxonomy from '../utils/taxonomy';
import { setup } from '../utils/resource-helper';

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

function setupTradeAPI(key, attributes) {
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
  return setup(key, assign({}, tradeAPI, attributes));
}

export default assign(
  {},
  setupTradeAPI('trade_events', {
    fields: {
      key: ['id', 'event_name'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['event_name'],
      url: ['url', 'registration_link']
    }
  }),

  setupTradeAPI('trade_leads', {
    fields: {
      key: ['id'],
      snippet: ['snippet'],
      source: ['source'],
      title: ['title', 'description'],
      url: ['url']
    }
  }),

  setupTradeAPI('consolidated_screening_list', {
    fields: {
      key: ['name'],
      source: ['source'],
      title: ['title', 'name'],
      url: ['source_list_url']
    }
  }),

  setupTradeAPI('market_research_library', {
    fields: {
      key: ['id'],
      snippet: ['description'],
      source: ['source'],
      title: ['title', 'name'],
      url: ['url']
    }
  }),

  setupTradeAPI('tariff_rates', {
    fields: {
      key: ['source_id'],
      snippet: ['rule_text'],
      source: ['source'],
      title: ['subheading_description'],
      url: ['link_url']
    }
  }),

  setupTradeAPI('ita_faqs', {
    fields: {
      key: ['id'],
      snippet: ['answer'],
      title: ['question']
    }
  }),

  setupTradeAPI('ita_office_locations', {
    fields: {
      key: ['id'],
      snippet: ['address'],
      title: ['office_name']
    }
  }),
  setupTradeAPI('trade_articles', {
    fields: {
      key: ['id'],
      snippet: ['summary'],
      source: ['source_agencies'],
      title: ['title'],
      url: ['trade_url']
    }
  }),
  setupTradeAPI('ita_zipcode_to_post', {
    fields: {
      key: ['zip_code'],
      snippet: ['zip_city'],
      source: ['state'],
      title: ['zip_code']
    }
  }),
  setupTradeAPI('business_service_providers', {
    fields: {
      key: ['company_name'],
      snippet: ['company_description'],
      title: ['company_name'],
      url: ['company_website']
    }
  }),
  setupTradeAPI('ita_taxonomies', {
    fields: {
      key: ['id'],
      snippet: ['narrower_terms'],
      title: ['name']
    }
  }),
  setupTradeAPI('de_minimis', {
    endpoint: endpoint('v1/de_minimis'),
    fields: {
      key: ['country'],
      snippet: ['notes'],
      title: ['country_name']
    }
  })
);
