import _ from 'lodash';
import assign from 'object-assign';
import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';

import { extract, parseAsTree } from '../utils/aggregation-parser';
import { formatFilterParams, formatParams, noAction } from '../utils/action-helper';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

const endpoint = 'https://pluto.kerits.org/v1/articles/search';

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

export function fetchArticles(dispatch, getState, query) {
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
      const data = {
        metadata: json.metadata,
        results: json.results,
        aggregations: {
          countries: _.reduce(json.aggregations.countries, (results, record) => {
            results[record.key] = record.key;
            return results;
          }, {}),
          industries:parseAsTree(json.aggregations.industries),
          topics: parseAsTree(json.aggregations.topics)
        }
      };
      dispatch(receiveArticles(data));
      return data;
    })
    .catch(e => ({ error: e }));
}
