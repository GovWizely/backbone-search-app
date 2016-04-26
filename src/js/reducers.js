import assign from 'object-assign';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'redux-simple-router';

import {
  INVALIDATE_QUERY_EXPANSIONS,
  REQUEST_QUERY_EXPANSIONS, RECEIVE_QUERY_EXPANSIONS } from './actions/query_expansion';
import {
  REQUEST_RESULTS, RECEIVE_RESULTS, FAILURE_RESULTS } from './actions/result';
import { INVALIDATE_FILTERS, REQUEST_FILTERS, RECEIVE_FILTERS } from './actions/filter';
import { UPDATE_WINDOW } from './actions/window';
import { UPDATE_QUERY, REPLACE_QUERY } from './actions/query';
import { SELECT_APIS } from './actions/api';

function apis(state = {}) {
  return state;
}

function filters(state = {
  invalidated: false,
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
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

function filtersByAggregation(state = {}, action) {
  switch (action.type) {
  case REQUEST_FILTERS:
  case RECEIVE_FILTERS:
  case INVALIDATE_FILTERS:
    return assign({}, state, { [action.meta]: filters(state[action.meta], action) });
  default:
    return state;
  }
}

function notifications(state = {}, action) {
  switch (action.type) {
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

function query(state = { q: '' }, action) {
  switch (action.type) {
  case UPDATE_QUERY:
    return assign({}, state, action.payload);
  case REPLACE_QUERY:
    return action.payload;
  default:
    return state;
  }
}

function queryExpansions(state = {
  invalidated: false,
  isFetching: false,
  items: {}
}, action) {
  switch (action.type) {
  case INVALIDATE_QUERY_EXPANSIONS:
    return assign({}, state, {
      invalidated: true
    });
  case REQUEST_QUERY_EXPANSIONS:
    return assign({}, state, {
      invalidated: false,
      isFetching: true
    });
  case RECEIVE_QUERY_EXPANSIONS:
    return assign({}, state, {
      invalidated: false,
      isFetching: false,
      items: action.payload
    });
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
  switch (action.type) {
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
  switch (action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, { [action.meta]: results(state[action.meta], action) });
  case RECEIVE_RESULTS:
    return assign({}, state, { [action.meta]: results(state[action.meta], action) });
  case UPDATE_QUERY:
  case REPLACE_QUERY:
    return {};
  default:
    return state;
  }
}


function selectedAPIs(state = [], action) {
  switch (action.type) {
  case SELECT_APIS:
    return action.payload;
  default:
    return state;
  }
}

function ui(state = {}) {
  return state;
}

function window(state = {}, action) {
  switch (action.type) {
  case UPDATE_WINDOW:
    return assign({}, state, action.payload);
  default:
    return state;
  }
}

const reducer = combineReducers({
  apis,
  filtersByAggregation,
  form: formReducer,
  notifications,
  query,
  queryExpansions,
  resultsByAPI,
  routing: routeReducer,
  selectedAPIs,
  ui,
  window
});

export default reducer;
