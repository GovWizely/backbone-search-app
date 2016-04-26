import { get, isEmpty, map, reject } from 'lodash';
import fetch from 'isomorphic-fetch';

import {
  formatAggregations, formatEndpoint, formatMetadata, formatParams,
  noAction, permitParams
} from '../utils/action-helper';
import { computeFiltersByAggregation } from './filter';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const FAILURE_RESULTS = 'FAILURE_RESULTS';

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
  let params = query || {};

  params = formatParams(params);

  if (api.transformParams) {
    params = api.transformParams(params);
  }

  params = permitParams(params, api.permittedParams);

  if (!params.q) params.q = '';

  return params;
}

function postprocess(api, _json) {
  const json = api.transformResponse ? api.transformResponse(_json) : _json;
  return {
    aggregations: formatAggregations(json.aggregations, api.aggregations),
    metadata: json.metadata || formatMetadata(json, api.metadata),
    results: json.results
  };
}

function createFetch(api, dispatch, getState) {
  return (query) => {
    if (get(getState().results, [api.uniqueId, 'isFetching'])) {
      dispatch(noAction());
      return null;
    }
    const params = preprocess(api, query);
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
    const { selectedAPIs, query } = getState();
    const fetches = map(selectedAPIs, api => createFetch(api, dispatch, getState));

    return Promise.all(map(fetches, f => f(query)))
      .then(responses => reject(responses, (response) => response.error))
      .then(responses => {
        if (!isEmpty(responses)) dispatch(computeFiltersByAggregation(responses));
        return responses;
      });
  };
}
