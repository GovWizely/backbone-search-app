import assign from 'object-assign';
import { parse } from 'url';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import {
  UPDATE_IS_ANY_FETCHING,
  REQUEST_RESULTS, RECEIVE_RESULTS, FAILURE_RESULTS } from './actions/result';
import { INVALIDATE_FILTERS, REQUEST_FILTERS, RECEIVE_FILTERS } from './actions/filter';
import { UPDATE_WINDOW } from './actions/window';

function filters(state = {
  invalidated: false,
  isFetching: false,
  items: {}
}, action) {
  switch(action.type) {
  case REQUEST_FILTERS:
    return assign({}, state, {
      isFetching: true,
      invalidated: false
    });
  case RECEIVE_FILTERS:
    return assign({}, state, {
      isFetching: false,
      invalidated: false,
      items: action.payload
    });
  case INVALIDATE_FILTERS:
    return assign({}, state, {
      invalidated: true
    });
  default:
    return state;
  }
}

function query(state = { q: '' }, action) {
  switch(action.type) {
  case UPDATE_PATH:
    return assign({}, state, parse(action.path, true).query);
  default:
    return state;
  }
}

function results(state = {
  aggregations: {},
  invalidated: false,
  isFetching: false,
  items: [], metadata: {}
}, action) {
  switch(action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_RESULTS:
    return assign({}, state, {
      isFetching: false,
      items: action.payload.results,
      metadata: action.payload.metadata,
      aggregations: action.payload.aggregations
    });
  default:
    return state;
  }
}

function resultsByAPI(state = {}, action) {
  switch(action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, { [action.meta]: results(state[action.meta], action) });
  case RECEIVE_RESULTS:
    return assign({}, state, { [action.meta]: results(state[action.meta], action) });
  case UPDATE_IS_ANY_FETCHING:
    return assign({}, state, { _isAnyFetching: action.payload });
  default:
    return state;
  }
}

function notifications(state = {}, action) {
  switch(action.type) {
  case FAILURE_RESULTS:
    return assign({}, state, {
      [action.meta]: {
        payload: action.payload,
        type: action.error ? 'error' : 'info'
      }
    });
  default:
    return state;
  }
}

function window(state = {}, action) {
  switch(action.type) {
  case UPDATE_WINDOW:
    return assign({}, state, action.payload);
  default:
    return state;
  }
}

const reducer = combineReducers({
  filters,
  form: formReducer,
  notifications,
  query,
  results: resultsByAPI,
  routing: routeReducer
});

export default reducer;
