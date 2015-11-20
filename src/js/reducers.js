import assign from 'object-assign';
import Url from 'url';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import {
  REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS,
  REQUEST_ARTICLES, RECEIVE_ARTICLES,
  REQUEST_TRADE_API, RECEIVE_TRADE_API,
  SET_QUERY, SET_FILTER
} from './actions';

const initialState = {
  query: {
    q: '',
    industries: [],
    countries: [],
    topics: [],
    offset: 0,
    filters: {}
  },
  aggregations: {
    isFetching: false,
    data: {}
  },
  results: {
    article: {
      isFetching: false,
      items: [],
      metadata: {},
      aggregations: {}
    },
    tradeEvent: {
      isFetching: false,
      items: [],
      metadata: {}
    },
    tradeLead: {
      isFetching: false,
      items: [],
      metadata: {}
    }
  }
};

function query(state = {}, action) {
  switch(action.type) {
  case SET_QUERY:
    return assign({}, state, action.query);
  case SET_FILTER:
    return assign({}, state, {
      filters: action.filters
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

function articles(state, action) {
  switch(action.type) {
  case REQUEST_ARTICLES:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_ARTICLES:
    return assign({}, state, {
      isFetching: false,
      items: action.response.results,
      metadata: action.response.metadata,
      aggregations: action.response.aggregations
    });
  default:
    return state;
  }
}

function tradeAPIs(state, action) {
  switch(action.type) {
  case REQUEST_TRADE_API:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_TRADE_API:
    return assign({}, state, {
      isFetching: false,
      items: action.response.results,
      metadata: action.response.metadata
    });
  }
}

function results(state = initialState.results, action) {
  switch(action.type) {
  case REQUEST_ARTICLES:
  case RECEIVE_ARTICLES:
    return assign({}, state, { article: articles(state.article, action) });
  case REQUEST_TRADE_API:
  case RECEIVE_TRADE_API:
    return assign({}, state, { [action.resource]: tradeAPIs(state[action.resource], action) });
    break;
  default:
    return state;
  }
}

const reducer = combineReducers({
  aggregations,
  query,
  results,
  form: formReducer,
  routing: routeReducer
});

export default reducer;
