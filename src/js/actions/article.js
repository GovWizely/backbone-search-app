import _ from 'lodash';
import assign from 'object-assign';
import axios from 'axios';

import Parser from '../utils/aggregation-parser';
import { formatFilterParams, formatParams } from '../utils/action-helper';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

function isFiltering(query) {
  const keys = Object.keys(query).map(k => k);
  for (let key in keys) {
    if (keys[key].split('-')[0] === 'filter') return true;
  }
  return false;
}

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
}

function receiveArticles(response) {
  return {
    type : RECEIVE_ARTICLES,
    response
  };
}

export function fetchArticles(query) {
  return (dispatch, getState) => {
    if (getState().results.article.isFetching) return null;

    dispatch(requestArticles());
    let params = formatParams(formatFilterParams(query), [
      'q', 'countries', 'industries', 'topics', 'types', 'offset'
    ]);
    if (_(Object.keys(params))
        .intersection(['q', 'countries', 'industries', 'topics', 'types'])
        .isEmpty()) {
      params.q = '';
    }
    return axios.get('https://pluto.kerits.org/v1/articles/search', { params })
      .then(function(response) {
        let data = {
          metadata: response.data.metadata,
          results: response.data.results
        };
        let aggregations = getState().results.article.aggregations;
        if (isFiltering(query) && !_.isEmpty(aggregations)) {
          data.aggregations = assign({}, getState().results.article.aggregations);
        } else {
          data.aggregations = {
            countries: Parser.extract(response.data.aggregations.countries, 'key'),
            industries: Parser.parseAsTree(response.data.aggregations.industries),
            topics: Parser.parseAsTree(response.data.aggregations.topics)
          };
        }
        dispatch(receiveArticles(data));
      });
  };
}
