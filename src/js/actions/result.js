import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import merge from 'deepmerge';
import Url from 'url';
import { stringify } from 'querystring';

import {
  formatAggregations, formatEndpoint, formatMetadata, formatParams,
  noAction
} from '../utils/action-helper';
import { requestFilters, receiveFilters } from './filter';

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const FAILURE_RESULTS = 'FAILURE_RESULTS';

function isFiltering(query) {
  if (!query || !query.filter) return false;

  return true;
}

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

function requestResults(api) {
  return {
    type: REQUEST_RESULTS,
    meta: api.uniqueId
  };
}

function receiveResults(api, response) {
  return {
    type: RECEIVE_RESULTS,
    meta: api.uniqueId,
    payload: response
  };
}

function failureResults(api, e) {
  return {
    type: FAILURE_RESULTS,
    error: true,
    meta: api.uniqueId,
    payload: e
  };
}

function createFetch(api, dispatch, getState) {
  return function(query) {
    if (getState().results[api.uniqueId].isFetching) {
      dispatch(noAction());
      return null;
    }
    let params = {};
    if (query) {
      params = formatParams(query, api.permittedParams);
    }
    if (api.transformParams) {
      params = api.transformParams(params);
    }
    if (!params.q) params.q = '';

    dispatch(requestResults(api));
    return fetch(formatEndpoint(api.endpoint, params))
      .then(response => response.json())
      .then(json => api.transformResponse ? api.transformResponse(json): json)
      .then(json => {
        const data = {
          aggregations: formatAggregations(json.aggregations, api.aggregations),
          metadata: json.metadata || formatMetadata(json, api.metadata),
          results: json.results
        };
        dispatch(receiveResults(api, data));
        return data;
      })
      .catch(e => dispatch(failureResults(api, e)));
  };
}

export function fetchResults(query, apis) {
  apis = _.isArray(apis) ? apis : [apis];
  return (dispatch, getState) => {
    const fetches = apis.map(api => createFetch(api, dispatch, getState));
    const updateFilter = _.isEmpty(getState().filters.items) || !isFiltering(query);

    if (updateFilter) dispatch(requestFilters());
    return Promise
      .all(_.map(fetches, f => f(query)))
      .then(responses => {
        if (updateFilter) {
          const filterableResponses = _(responses)
            .reject(o => _.isEmpty(o.aggregations))
            .reject(o => _.get(o, 'metadata.total') === 0)
            .value();
          const filters = consolidateFilters(filterableResponses);
          dispatch(receiveFilters(filters));
        }
        return responses;
      })
      .catch(e => dispatch(failureResults('filter', e)));
  };
}
