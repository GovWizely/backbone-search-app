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

export const REQUEST_RESOURCE = 'REQUEST_RESOURCE';
export const RECEIVE_RESOURCE = 'RECEIVE_RESOURCE';

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

function requestResource(resource) {
  return {
    type: REQUEST_RESOURCE,
    meta: resource.stateKey
  };
}

function receiveResource(resource, response) {
  return {
    type: RECEIVE_RESOURCE,
    payload: response,
    meta: resource.stateKey
  };
}

function Resource(resource, dispatch, getState) {
  this.dispatch = dispatch;
  this.resource = resource;
  this.getState = getState;

  this.fetch = function(query) {
    if (this.getState().results[resource.stateKey].isFetching) {
      this.dispatch(noAction());
      return null;
    }
    console.log(resource);
    let params = {};
    if (query) {
      params = formatParams(query, resource.permittedParams);
    }
    if (!params.q) params.q = '';

    this.dispatch(requestResource(resource));
    return fetch(formatEndpoint(resource.endpoint, params))
      .then(response => response.json())
      .then(json => {
        const data = {
          metadata: json.metadata || formatMetadata(json, resource.metadata),
          results: json.results,
          aggregations: formatAggregations(json.aggregations, resource.aggregations)
        };
        this.dispatch(receiveResource(resource, data));
        return data;
      });
  };
}

export function fetchResources(query, resources) {
  resources = _.isArray(resources) ? resources : [resources];

  return (dispatch, getState) => {
    const fetchers = resources.map(resource => new Resource(resource, dispatch, getState));
    const updateFilter = _.isEmpty(getState().filters.items) || !isFiltering(query);
    if (updateFilter) dispatch(requestFilters());
    return Promise
      .all(_.map(fetchers, o => o.fetch(query)))
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
