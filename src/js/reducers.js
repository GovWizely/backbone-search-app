import assign from 'object-assign';
import { parse } from 'url';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer, UPDATE_PATH } from 'redux-simple-router';

import { REQUEST_RESOURCE, RECEIVE_RESOURCE } from './actions/resource';
import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from './actions/article';
import { REQUEST_TRADES, RECEIVE_TRADES } from './actions/trade';
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

    /* istanbul ignore next */
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
    /* istanbul ignore next */
  default:
    return state;
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

function resources(state = initialState.results, action) {
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
  results: resources,
  filters,
  form: formReducer,
  query,
  routing: routeReducer
});

export default reducer;
