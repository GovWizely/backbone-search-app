import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

import { extract, parseAsTree } from '../utils/aggregation-parser';
import { formatFilterParams, formatParams, noAction } from '../utils/action-helper';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

const endpoint = 'https://pluto.kerits.org/v1/articles/search';

function isFiltering(query) {
  if (!query) return false;

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
    if (getState().results.article.isFetching) {
      dispatch(noAction());
      return null;
    };

    dispatch(requestArticles());
    let params = {};
    if (query) {
      params = formatParams(formatFilterParams(query), [
        'q', 'countries', 'industries', 'topics', 'types', 'offset'
      ]);
    }
    if (_(Object.keys(params))
        .intersection(['q', 'countries', 'industries', 'topics', 'types'])
        .isEmpty()) {
      params.q = '';
    }
    return fetch(`${endpoint}?${stringify(params)}`)
      .then(response => response.json())
      .then(json => {
        let data = { metadata: json.metadata, results: json.results };
        let aggregations = getState().results.article.aggregations;
        if (isFiltering(query) && !_.isEmpty(aggregations)) {
          data.aggregations = assign({}, getState().results.article.aggregations);
        } else {
          data.aggregations = {
            countries: _.reduce(json.aggregations.countries, (results, record) => {
              results[record.key] = record.key;
              return results;
            }, {}),
            industries:parseAsTree(json.aggregations.industries),
            topics: parseAsTree(json.aggregations.topics)
          };
        }
        dispatch(receiveArticles(data));
      });
  };
}
