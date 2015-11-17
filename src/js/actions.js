import axios from 'axios';

export const REQUEST_AGGREGATIONS = 'REQUEST_AGGREGATIONS';
export const RECEIVE_AGGREGATIONS = 'RECEIVE_AGGREGATIONS';
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SET_COUNTRIES = 'SET_COUNTRIES';
export const SET_INDUSTRIES = 'SET_INDUSTRIES';
export const SET_TOPICS = 'SET_TOPICS';
export const SET_TYPES = 'SET_TYPES';

export function searchArticles(query) {
  return {
    type: SEARCH_ARTICLES,
    query: query
  };
}

function requestAggregations() {
  return {
    type: REQUEST_AGGREGATIONS
  };
}

function receiveAggregations(response) {
  return {
    type: RECEIVE_AGGREGATIONS,
    aggregations: response,
    receivedAt: Date.now()
  };
}

export function fetchAggregations() {
  return (dispatch, getState) => {
    if (getState().aggregations.isFetching) return null;

    dispatch(requestAggregations());
    return axios.get('https://pluto.kerits.org/v1/articles/count?q=')
      .then(function(response) {
        dispatch(receiveAggregations(response.data.aggregations));
      });
  };
}

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
}

function receiveArticles(response) {
  return {
    type : RECEIVE_ARTICLES,
    articles: response.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchArticles() {
  return dispatch => {
    dispatch(requestArticles());
    return axios.get('https://pluto.kerits.org/v1/articles/search', { params })
      .then(function(response) {
        dispatch(receiveArticles(response.data.results));
      });
  };
}

function shouldFetchArticles(state) {
  const articles = state.articles;
  if (!articles) {
    return true;
  } else {
    return !articles.isFetching;
  }
}

export function fetchArticles(params) {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState())) {
      return dispatch(fetchArticles(params));
    }
  };
}
