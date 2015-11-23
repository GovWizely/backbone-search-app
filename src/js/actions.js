import _ from 'lodash';
import assign from 'object-assign';
import axios from 'axios';
import Parser from './utils/aggregation-parser';

export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS';
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS';
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const REQUEST_TRADE_API = 'REQUEST_TRADE_API';
export const RECEIVE_TRADE_API = 'RECEIVE_TRADE_API';

function formatParams(query, whitelist) {
  let params = _.pick(query, whitelist);
  for (let key in params) {
    if (_.isArray(params[key])) params[key] = params[key].join(',');
  }
  return params;
}

function formatFilterParams(query) {
  let params = assign({}, query);
  const keys = Object.keys(query).map(k => k);
  keys.forEach(key => {
    let keyArray = key.split('-');
    if (keyArray[0] === 'filter') {
      let filter = keyArray.slice(1, keyArray.length);
      params[filter] = params[filter] || [];
      params[filter] = params[filter].concat(query[key]);
    }
  });
  return params;
}

function isFiltering(query) {
  const keys = Object.keys(query).map(k => k);
  for (let key in keys) {
    if (keys[key].split('-')[0] === 'filter') return true;
  }
  return false;
}

function requestAggregations() {
  return {
    type: REQUEST_AGGREGATIONS
  };
}

function receiveAggregations(response) {
  return {
    type: RECEIVE_AGGREGATIONS,
    aggregations: response
  };
}

export function fetchAggregations() {
  return (dispatch, getState) => {
    if (getState().aggregations.isFetching) return null;

    dispatch(requestAggregations());
    return axios.get('https://pluto.kerits.org/v1/articles/count?q=')
      .then(function(response) {
        let aggregations = {};
        aggregations.countries = response.data.aggregations.countries;
        aggregations.industries = Parser.parse(response.data.aggregations.industries);
        aggregations.topics = Parser.parse(response.data.aggregations.topics);
        dispatch(receiveAggregations(aggregations));
      });
  };
}

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
}

function receiveArticles(response) {
  return {
    type : RECEIVE_ARTICLES,
    response
  };
}

export function fetchArticles(query) {
  return (dispatch, getState) => {
    if (getState().results.article.isFetching) return null;

    dispatch(requestArticles());
    let params = formatParams(formatFilterParams(query), [
      'q', 'countries', 'industries', 'topics', 'types', 'offset'
    ]);
    if (_(Object.keys(params))
        .intersection(['q', 'countries', 'industries', 'topics', 'types'])
        .isEmpty()) {
      params.q = '';
    }
    return axios.get('https://pluto.kerits.org/v1/articles/search', { params })
      .then(function(response) {
        let data = {
          metadata: response.data.metadata,
          results: response.data.results
        };
        let aggregations = getState().results.article.aggregations;
        if (isFiltering(query) && !_.isEmpty(aggregations)) {
          data.aggregations = assign({}, getState().results.article.aggregations);
        } else {
          data.aggregations = {
            countries: Parser.extract(response.data.aggregations.countries, 'key'),
            industries: Parser.parseAsTree(response.data.aggregations.industries),
            topics: Parser.parseAsTree(response.data.aggregations.topics)
          };
        }
        dispatch(receiveArticles(data));
      });
  };
}

function requestTradeAPI(resource) {
  return {
    type: REQUEST_TRADE_API,
    resource: resource.stateKey
  };
}

function receiveTradeAPI(resource, response) {
  return {
    type : RECEIVE_TRADE_API,
    resource: resource.stateKey,
    response
  };
}

const tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';
function fetchTradeAPI(resource, params) {
  return (dispatch, getState) => {
    if (getState().results[resource.stateKey].isFetching) return null;
    dispatch(requestTradeAPI(resource));

    return axios.get(`https://api.trade.gov/${resource.apiPath}/search?api_key=${tradeAPIKey}`, { params })
      .then(function(response) {
        const { total, offset, sources_used, results } = response.data;
        let data = {
          metadata: { total, offset, sources_used },
          results
        };
        dispatch(receiveTradeAPI(resource, data));
      });
  };
}

export function fetchTradeEvents(query) {
  const resource = { stateKey: 'tradeEvent', apiPath: 'trade_events' };

  const params = formatParams(query, [
    'q', 'countries', 'industries', 'sources',
    'start_date', 'end_date', 'size', 'offset'
  ]);
  return fetchTradeAPI(resource, params);
}

export function fetchTradeLeads(query) {
  const resource = { stateKey: 'tradeLead', apiPath: 'trade_leads' };
  const params = formatParams(query, [
    'q', 'countries', 'industries', 'sources',
    'start_date', 'end_date', 'size', 'offset'
  ]);
  return fetchTradeAPI(resource, params);
}
