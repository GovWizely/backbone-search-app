import axios from 'axios';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

function requestArticles() {
  return {
    type: REQUEST_ARTICLES
  };
};

function receiveArticles(response) {
  return {
    type : RECEIVE_ARTICLES,
    articles: response.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

;

function fetchArticles(params) {
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
