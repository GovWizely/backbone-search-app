import assign from 'object-assign';
import { parse } from 'url';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from './actions/aggregation';
import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from './actions/article';
import { REQUEST_TRADES, RECEIVE_TRADES } from './actions/trade';

const initialState = {
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
  },
  query: {}
};

function aggregations(state = initialState.aggregations, action) {
  switch(action.type) {
  case REQUEST_AGGREGATIONS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_AGGREGATIONS:
    return assign({}, state, {
      isFetching: false,
      data: action.response
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

function trades(state, action) {
  switch(action.type) {
  case REQUEST_TRADES:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_TRADES:
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
  case REQUEST_TRADES:
  case RECEIVE_TRADES:
    return assign({}, state, { [action.resource]: trades(state[action.resource], action) });
  default:
    return state;
  }
}

function query(state = {}, action) {
  switch(action.type) {
  case UPDATE_PATH:
    return parse(action.path, true).query;
  default:
    return state;
  }
}

const reducer = combineReducers({
  aggregations,
  results,
  form: formReducer,
  query,
  routing: routeReducer
});

export default reducer;
