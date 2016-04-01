import assign from 'object-assign';
import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

import { formatParams } from '../utils/action-helper';

export const INVALIDATE_QUERY_EXPANSIONS = 'INVALIDATE_QUERY_EXPANSION';
export const REQUEST_QUERY_EXPANSIONS = 'REQUEST_QUERY_EXPANSIONS';
export const RECEIVE_QUERY_EXPANSIONS = 'RECEIVE_QUERY_EXPANSIONS';

const endpoint = 'https://api.govwizely.com/ita_taxonomies/query_expansion';
const defaultParams = {
  api_key: '0ooVzDG3pxt0azCL9uUBMYLS'
};

export function invalidateQueryExpansions() {
  return {
    type: INVALIDATE_QUERY_EXPANSIONS
  };
}

function requestQueryExpansions() {
  return {
    type: REQUEST_QUERY_EXPANSIONS
  };
}

function receiveQueryExpansions(json) {
  return {
    type: RECEIVE_QUERY_EXPANSIONS,
    payload: json.query_expansion
  };
}

function fetchQueryExpansions(query) {
  const params = assign({}, defaultParams, formatParams(query, ['q']));
  return (dispatch) => {
    if (!params.q) return Promise.resolve();

    dispatch(requestQueryExpansions());
    return fetch(`${endpoint}?${stringify(params)}`)
      .then(response => response.json())
      .then(json => dispatch(receiveQueryExpansions(json)));
  };
}

function shouldFetchQueryExpansions(state) {
  const queryExpansions = state.queryExpansions;
  if (!queryExpansions) {
    return true;
  } else if (queryExpansions.isFetching) {
    return false;
  }
  return queryExpansions.invalidated;
}

export function fetchQueryExpansionsIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchQueryExpansions(getState())) {
      return dispatch(fetchQueryExpansions(query));
    }
    return null;
  };
}
