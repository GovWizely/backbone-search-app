import assign from 'object-assign';
import { parse } from 'url';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import { REQUEST_RESOURCE, RECEIVE_RESOURCE } from './actions/resource';
import { REQUEST_FILTERS, RECEIVE_FILTERS } from './actions/filter';

const initialState = {
  filters: {
    isFetching: false,
    items: {}
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
      metadata: {},
      aggregations: {}
    },
    tradeLead: {
      isFetching: false,
      items: [],
      metadata: {},
      aggregations: {}
    }
  },
  query: {}
};

function filters(state = initialState.filters, action) {
  switch(action.type) {
  case REQUEST_FILTERS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_FILTERS:
    return assign({}, state, {
      isFetching: false,
      items: action.filters
    });
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

function resource(state, action) {
  switch(action.type) {
  case REQUEST_RESOURCE:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_RESOURCE:
    return assign({}, state, {
      isFetching: false,
      items: action.payload.results,
      metadata: action.payload.metadata
    });
  default:
    return state;
  }
}

function results(state = initialState.results, action) {
  switch(action.type) {
  case REQUEST_RESOURCE:
    return assign({}, state, { [action.meta]: resource(state[action.meta], action) });
  case RECEIVE_RESOURCE:
    return assign({}, state, { [action.meta]: resource(state[action.meta], action) });
  default:
    return state;
  }
}

const reducer = combineReducers({
  results,
  filters,
  form: formReducer,
  query,
  routing: routeReducer
});

export default reducer;
