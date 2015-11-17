import assign from 'object-assign';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import {
  REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS,
  REQUEST_ARTICLES, RECEIVE_ARTICLES, SEARCH_ARTICLES,
  SET_KEYWORD, SET_COUNTRIES, SET_INDUSTRIES, SET_TOPICS, SET_TYPES
} from './actions';

const initialState = {
  query: {
    keyword: '',
    industries: [],
    countries: [],
    topics: [],
    types: [],
    offset: 0
  },
  aggregations: {
    isFetching: false,
    data: {}
  },
  results: {
    article: {
      isFetching: false,
      items: []
    },
    tradeEvent: {
      isFetching: false,
      items: []
    },
    tradeLead: {
      isFetching: false,
      items: []
    }
  }
};

function query(state = {}, action) {
  switch(action.type) {
  case SET_KEYWORD:
    return assign({}, state, {
      keyword: action.keyword
    });
  case SET_INDUSTRIES:
    return assign({}, state, {
      industries: action.industries
    });
  default:
    return state;
  }
}

function aggregations(state = initialState.aggregations, action) {
  switch(action.type) {
  case REQUEST_AGGREGATIONS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_AGGREGATIONS:
    return assign({}, state, {
      isFetching: false,
      data: action.aggregations
    });
  default:
    return state;
  }
}

function results(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
  case REQUEST_ARTICLES:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_ARTICLES:
    return assign({}, state, {
      isFetching: false, items: action.results
    });
  default:
    return state;
  }
}

function update(state = {}, action) {
  switch(action.type) {
  case UPDATE_PATH:
    return assign({}, state, {

    });
  default:
    return state;
  }
}

const reducer = combineReducers({
  aggregations,
  query,
  results,
  routing: routeReducer,
  update
});

export default reducer;
