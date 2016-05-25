import assign from 'object-assign';
import { at, compact, get, isEmpty, map } from 'lodash';
import fetch from 'isomorphic-fetch';
import invariant from 'invariant';

import {
  formatAggregations, formatEndpoint, formatMetadata, formatParams, permitParams
} from '../utils/action-helper';
import { computeFiltersByAggregation } from './filter';
import { notify } from './notification';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const FAILURE_RESULTS = 'FAILURE_RESULTS';
export const INVALIDATE_RESULTS = 'INVALIDATE_RESULTS';

export function requestResults(uniqueId) {
  return {
    type: REQUEST_RESULTS,
    meta: uniqueId
  };
}

export function receiveResults(uniqueId, response) {
  return {
    type: RECEIVE_RESULTS,
    meta: uniqueId,
    payload: response
  };
}

export function failureResults(uniqueId, e) {
  return {
    type: FAILURE_RESULTS,
    error: true,
    meta: uniqueId,
    payload: e
  };
}

export function invalidateResults(uniqueId) {
  return {
    type: INVALIDATE_RESULTS,
    meta: uniqueId
  };
}

function preprocess(api, query) {
  let params = assign({}, query);

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

function fetchResults(api) {
  return (dispatch, getState) => {
    dispatch(requestResults(api.uniqueId));
    const params = preprocess(api, getState().query);
    return fetch(formatEndpoint(api.endpoint, params))
      .then(response => {
        invariant(response.status === 200, response.statusText);
        return response.json();
      })
      .then(json => {
        const data = postprocess(api, json);
        dispatch(receiveResults(api.uniqueId, data));
        return data;
      })
      .catch(e => {
        dispatch(notify({ text: `${api.uniqueId}: ${e.message}`, status: 'error' }));
        return dispatch(failureResults(api.uniqueId, e));
      });
  };
}

function shouldFetchResults(state, api) {
  const result = get(state.resultsByAPI, api.uniqueId);
  const { query } = state;

  if (compact(at(query, api.requiredParams)).length === 0) return false;

  if (!result || isEmpty(result)) {
    return true;
  } else if (result.isFetching) {
    return false;
  }
  return result.invalidated;
}

function fetchResultsIfNeeded(api) {
  return (dispatch, getState) => {
    if (!shouldFetchResults(getState(), api)) return Promise.resolve();

    return dispatch(fetchResults(api));
  };
}

export function fetchResultsByAPI() {
  return (dispatch, getState) => {
    const { selectedAPIs } = getState();

    return Promise.all(
      map(selectedAPIs, (api) => dispatch(fetchResultsIfNeeded(api)))
    ).then(() => dispatch(computeFiltersByAggregation()));
  };
}

export function invalidateAllResults() {
  return (dispatch, getState) => {
    const { resultsByAPI: results } = getState();

    return Promise.all(
      map(results, (result, uniqueId) => dispatch(invalidateResults(uniqueId)))
    );
  };
}
