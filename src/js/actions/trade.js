import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

import { formatFilterParams, formatParams, noAction } from '../utils/action-helper';
import * as taxonomy from '../utils/taxonomy';

export const REQUEST_TRADES = 'REQUEST_TRADES';
export const RECEIVE_TRADES = 'RECEIVE_TRADES';
const tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';

function transform(params) {
  if (params.countries) params.countries = taxonomy.countryToAbbr(params.countries);
  return params;
}

function requestTrades(resource) {
  return {
    type: REQUEST_TRADES,
    resource: resource.stateKey
  };
}

function receiveTrades(resource, response) {
  return {
    type : RECEIVE_TRADES,
    resource: resource.stateKey,
    response
  };
}

function fetchTrades(dispatch, getState, resource, params) {
  const endpoint = `https://api.trade.gov/${resource.apiPath}/search?api_key=${tradeAPIKey}`;
  if (getState().results[resource.stateKey].isFetching) {
    dispatch(noAction());
    return null;
  }
  dispatch(requestTrades(resource));

  params = transform(params);
  return fetch(`${endpoint}&${stringify(params)}`)
    .then(response => response.json())
    .then(json => {
      const { total, offset, sources_used, results } = json;
      let data = {
        aggregations: {
          countries: _.reduce(json.aggregations.countries, (results, record) => {
            let country = taxonomy.abbrToCountry(record.key) || record.key;
            results[country] = country;
            return results;
          }, {})
        },
        metadata: { total, offset, sources_used },
        results
      };
      dispatch(receiveTrades(resource, data));
      return data;
    })
    .catch(e => ({ error: e }));
}

export function fetchTradeEvents(dispatch, getState, query) {
  const resource = { stateKey: 'tradeEvent', apiPath: 'trade_events' };

  return fetchTrades(dispatch, getState, resource, params);
}

export function fetchTradeLeads(dispatch, getState, query) {
  const resource = { stateKey: 'tradeLead', apiPath: 'trade_leads' };
  return fetchTrades(dispatch, getState, resource, params);
}
