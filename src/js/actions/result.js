import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import merge from 'deepmerge';
import Url from 'url';
import { stringify } from 'querystring';

import {
  formatAggregations, formatEndpoint, formatMetadata, formatParams,
  noAction
} from '../utils/action-helper';
import { computeFiltersByAggregation } from './filter';
import { updateStatus } from './status';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const FAILURE_RESULTS = 'FAILURE_RESULTS';

function consolidateFilters(responses) {
  let filters = {};
  const aggregationKeys = responses.map(response => Object.keys(response.aggregations));
  const commonAggregationKeys = _.intersection(...aggregationKeys);
  commonAggregationKeys.forEach(key => {
    filters[key] = {};
  });
  responses.forEach(response => {
    commonAggregationKeys.forEach(key => {
      filters[key] = merge(filters[key], response.aggregations[key]);
    });
 });

  return filters;
}

export function requestResults(api) {
  return {
    type: REQUEST_RESULTS,
    meta: api.uniqueId
  };
}

export function receiveResults(api, response) {
  return {
    type: RECEIVE_RESULTS,
    meta: api.uniqueId,
    payload: response
  };
}

export function failureResults(api, e) {
  return {
    type: FAILURE_RESULTS,
    error: true,
    meta: api.uniqueId,
    payload: e
  };
}

function preprocess(api, query) {
  let params = {};
  if (query) {
    params = formatParams(query, api.permittedParams);
  }
  if (api.transformParams) {
    params = api.transformParams(params);
  }
  if (!params.q) params.q = '';

  return params;
}

function postprocess(api, json) {
  json = api.transformResponse ? api.transformResponse(json) : json;
  return {
    aggregations: formatAggregations(json.aggregations, api.aggregations),
    metadata: json.metadata || formatMetadata(json, api.metadata),
    results: json.results
  };
}

function createFetch(api, dispatch, getState) {
  return function(query) {
    if (_.get(getState().results, [api.uniqueId, 'isFetching'])) {
      dispatch(noAction());
      return null;
    }
    let params = preprocess(api, query);
    dispatch(requestResults(api));
    return fetch(formatEndpoint(api.endpoint, params))
      .then(response => response.json())
      .then(json => {
        const data = postprocess(api, json);
        dispatch(receiveResults(api, data));
        return data;
      })
      .catch(e => dispatch(failureResults(api, e)));
  };
}

export function fetchResults() {
  return (dispatch, getState) => {
    const { selectedAPIs, filters, query } = getState();
    const fetches = _.map(selectedAPIs, api => createFetch(api, dispatch, getState));

    return Promise.all(_.map(fetches, f => f(query)))
      .then(responses => {
        dispatch(computeFiltersByAggregation(responses));
        return responses;
      });
  };
}
