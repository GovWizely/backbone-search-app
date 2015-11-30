import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'node-fetch'; fetch.Promise = require('bluebird');
import Parser from '../utils/aggregation-parser';
import { noAction } from '../utils/action-helper';

export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS';
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS';

const endpoint = 'https://pluto.kerits.org/v1/articles/count';

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
    if (getState().aggregations.isFetching) {
      dispatch(noAction());
      return null;
    }
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
