import { difference, reject } from 'lodash';
import assign from 'object-assign';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import { ignoreActions } from 'redux-ignore';

import {
  REQUEST_RESULTS, RECEIVE_RESULTS, FAILURE_RESULTS, INVALIDATE_RESULTS } from './actions/result';
import { INVALIDATE_FILTERS, REQUEST_FILTERS, RECEIVE_FILTERS } from './actions/filter';
import { UPDATE_WINDOW } from './actions/window';
import { UPDATE_QUERY, REPLACE_QUERY } from './actions/query';
import { SELECT_APIS } from './actions/api';
import { ADD_NOTIFICATION, DISMISS_NOTIFICATION } from './actions/notification';
import { REQUEST_TYPEAHEADS, RECEIVE_TYPEAHEADS, FAILURE_TYPEAHEADS, INVALIDATE_TYPEAHEADS } from './actions/typeaheads';

// work around this issue https://github.com/omnidan/redux-ignore/issues/4
const CONSTANTS = [
  REQUEST_RESULTS, RECEIVE_RESULTS, FAILURE_RESULTS, INVALIDATE_RESULTS,
  INVALIDATE_FILTERS, REQUEST_FILTERS, RECEIVE_FILTERS,
  UPDATE_WINDOW, UPDATE_QUERY, REPLACE_QUERY, SELECT_APIS,
  ADD_NOTIFICATION, DISMISS_NOTIFICATION,
  REQUEST_TYPEAHEADS, RECEIVE_TYPEAHEADS, FAILURE_TYPEAHEADS, INVALIDATE_TYPEAHEADS
];

function filterActions(action, constants = []) {
  return ignoreActions(action, difference(CONSTANTS, constants));
}

function apis(state = {}) {
  return state;
}

function filters(state = {
  invalidated: false,
  displayName: '',
  items: {}
}, action) {
  switch (action.type) {
  case RECEIVE_FILTERS:
    return assign({}, state, {
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

function notifications(state = [], action) {
  const _state = assign([], state);
  switch (action.type) {
  case ADD_NOTIFICATION:
    return _state.concat(action.payload);
  case DISMISS_NOTIFICATION:
    return reject(state, { id: action.payload });
  default:
    return _state;
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

function results(state = {
  aggregations: {},
  invalidated: false,
  isFetching: false,
  items: [],
  metadata: {}
}, action) {
  switch (action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, {
      invalidated: false,
      isFetching: true
    });
  case RECEIVE_RESULTS:
    return assign({}, state, {
      invalidated: false,
      isFetching: false,
      items: action.payload.results,
      metadata: action.payload.metadata,
      aggregations: action.payload.aggregations
    });
  case FAILURE_RESULTS:
    return assign({}, state, {
      invalidated: false,
      isFetching: false
    });
  case INVALIDATE_RESULTS:
    return assign({}, state, {
      invalidated: true
    });
  default:
    return state;
  }
}

function resultsByAPI(state = {}, action) {
  switch (action.type) {
  case REQUEST_RESULTS:
  case RECEIVE_RESULTS:
  case FAILURE_RESULTS:
  case INVALIDATE_RESULTS:
    return assign({}, state, { [action.meta]: results(state[action.meta], action) });
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

function window(state = {}, action) {
  switch (action.type) {
  case UPDATE_WINDOW:
    return assign({}, state, action.payload);
  default:
    return state;
  }
}

function typeaheads(state = {
  invalidated: false,
  isFetching: false,
  typeaheads: [],
}, action) {
  switch (action.type) {
  case REQUEST_TYPEAHEADS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_TYPEAHEADS:
    return assign({}, state, {
      isFetching: false,
      typeaheads: action.payload,
    });
  case FAILURE_TYPEAHEADS:
    return assign({}, state, {
      isFetching: false
    });
  case INVALIDATE_TYPEAHEADS:
    return assign({}, state, {
      invalidated: true
    });
  default:
    return state;
  }
}

function typeaheadsByAPI(state = {}, action) {
  switch (action.type) {
  case REQUEST_TYPEAHEADS:
  case RECEIVE_TYPEAHEADS:
  case FAILURE_TYPEAHEADS:
  case INVALIDATE_TYPEAHEADS:
    return assign({}, state, { [action.meta]: typeaheads(state[action.meta], action) });
  default:
    return state;
  }
}

const reducer = combineReducers({
  apis: filterActions(apis, []),

  filtersByAggregation: filterActions(
    filtersByAggregation,
    [REQUEST_FILTERS, RECEIVE_FILTERS, INVALIDATE_FILTERS]
  ),

  form: filterActions(form, []),

  notifications: filterActions(notifications, [ADD_NOTIFICATION, DISMISS_NOTIFICATION]),

  query: filterActions(query, [UPDATE_QUERY, REPLACE_QUERY]),

  resultsByAPI: filterActions(
    resultsByAPI,
    [REQUEST_RESULTS, RECEIVE_RESULTS, FAILURE_RESULTS, INVALIDATE_RESULTS]
  ),

  routing: filterActions(routerReducer, []),

  selectedAPIs: filterActions(selectedAPIs, [SELECT_APIS]),

  window: filterActions(window, [UPDATE_WINDOW]),

  typeaheadsByAPI: filterActions(typeaheadsByAPI, [REQUEST_TYPEAHEADS, RECEIVE_TYPEAHEADS, FAILURE_TYPEAHEADS])
});

export default enableBatching(reducer);
