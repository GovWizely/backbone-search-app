import assign from 'object-assign';
import { parse } from 'url';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import { REQUEST_RESULTS, RECEIVE_RESULTS } from './actions/result';
import { REQUEST_FILTERS, RECEIVE_FILTERS } from './actions/filter';
import initialState from './initial-state';

function filters(state = initialState.filters, action) {
  switch(action.type) {
  case REQUEST_FILTERS:
    return assign({}, state, {
      isFetching: true
    });
  case RECEIVE_FILTERS:
    return assign({}, state, {
      isFetching: false,
      items: action.payload
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

function result(state, action) {
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

function results(state = initialState.results, action) {
  switch(action.type) {
  case REQUEST_RESULTS:
    return assign({}, state, { [action.meta]: result(state[action.meta], action) });
  case RECEIVE_RESULTS:
    return assign({}, state, { [action.meta]: result(state[action.meta], action) });
  default:
    return state;
  }
}

const reducer = combineReducers({
  filters,
  form: formReducer,
  query,
  results,
  routing: routeReducer
});

export default reducer;
