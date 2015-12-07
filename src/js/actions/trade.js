import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'node-fetch'; fetch.Promise = require('bluebird');
import { stringify } from 'querystring';

import { formatFilterParams, formatParams, noAction } from '../utils/action-helper';
import * as taxonomy from '../utils/taxonomy';

export const REQUEST_TRADES = 'REQUEST_TRADES';
export const RECEIVE_TRADES = 'RECEIVE_TRADES';
const tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';

function transform(params) {
  if (params.countries) params.countries = taxonomy.country(params.countries);
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

function fetchTrades(resource, params) {
  const endpoint = `https://api.trade.gov/${resource.apiPath}/search?api_key=${tradeAPIKey}`
  ;
  return (dispatch, getState) => {
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
          metadata: { total, offset, sources_used },
          results
        };
        dispatch(receiveTrades(resource, data));
      });
  };
}

export function fetchTradeEvents(query) {
  const resource = { stateKey: 'tradeEvent', apiPath: 'trade_events' };

  const params = formatParams(query, [
    'q', 'countries', 'industries', 'sources',
    'start_date', 'end_date', 'size', 'offset'
  ]);
  return fetchTrades(resource, params);
}

export function fetchTradeLeads(query) {
  const resource = { stateKey: 'tradeLead', apiPath: 'trade_leads' };
  const params = formatParams(query, [
    'q', 'countries', 'industries', 'sources',
    'start_date', 'end_date', 'size', 'offset'
  ]);
  return fetchTrades(resource, params);
}
