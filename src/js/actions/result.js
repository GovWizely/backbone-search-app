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

function rejectEmptyData(responses) {
  return responses.filter(response => _.get(response, 'metadata.total') > 0);
}

function requestResults(resource) {
  return {
    type: REQUEST_RESULTS,
    meta: resource.stateKey
  };
}

function receiveResults(resource, response) {
  return {
    type: RECEIVE_RESULTS,
    payload: response,
    meta: resource.stateKey
  };
}

function generateFetch(resource, dispatch, getState) {
  return function(query) {
    if (getState().results[resource.stateKey].isFetching) {
      dispatch(noAction());
      return null;
    }
    let params = {};
    if (query) {
      params = formatParams(query, resource.permittedParams);
    }
    if (resource.transformParams) {
      params = resource.transformParams(params);
    }
    if (!params.q) params.q = '';

    dispatch(requestResults(resource));
    return fetch(formatEndpoint(resource.endpoint, params))
      .then(response => response.json())
      .then(json => resource.transformResponse ? resource.transformResponse(json): json)
      .then(json => {
        const data = {
          metadata: json.metadata || formatMetadata(json, resource.metadata),
          results: json.results,
          aggregations: formatAggregations(json.aggregations, resource.aggregations)
        };
        dispatch(receiveResults(resource, data));
        return data;
      })
      .catch(e => ({ error: e }));
  };
}

export function fetchResults(query, resources) {
  resources = _.isArray(resources) ? resources : [resources];

  return (dispatch, getState) => {
    const fetches = resources.map(resource => generateFetch(resource, dispatch, getState));
    const updateFilter = _.isEmpty(getState().filters.items) || !isFiltering(query);
    if (updateFilter) dispatch(requestFilters());
    return Promise
      .all(_.map(fetches, f => f(query)))
      .then(responses => {
        if (updateFilter) {
          const filters = consolidateFilters(rejectEmptyData(responses));
          dispatch(receiveFilters(filters));
        }
        return responses;
      })
      .catch(e => ({ error: e }));
  };
}
