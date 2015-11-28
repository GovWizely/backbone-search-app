import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'node-fetch'; fetch.Promise = require('bluebird');
import Parser from '../utils/aggregation-parser';

export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS';
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS';

const endpoint = 'https://pluto.kerits.org/v1/articles/count';

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
    response
  };
}

export function fetchAggregations() {
  return (dispatch, getState) => {
    if (getState().aggregations.isFetching) return null;
    dispatch(requestAggregations());
    return fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveAggregations({
          countries: json.aggregations.countries,
          industries: Parser.parse(json.aggregations.industries),
          topics: Parser.parse(json.aggregations.topics)
        }));
      });
  };
}
