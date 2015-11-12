import assign from 'object-assign';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

const initialState = {
  keyword: '',
  filters: [],
  articles: {},
  tradeEvents: {},
  tradeLeads: {}
};

function articles(state = { isFetching: false, items: [] }, action) {
  switch(action.type) {
  case 'search':
    return assign({}, state, {});
  case 'filter':
    return assign({}, state, {});
  case 'paging':
    return assign({}, state, {});
  default:
    return state;
  }
}

function resultsByAPI(state = {}, action) {
  switch(action.type) {
  case 'RECEIVE_ARTICLES':
  case 'REQUEST_ARTICLES':
    return assign({}, state, {
      articles: articles(state.articles, action)
    });
  default:
    return state;
  }
}

const reducer = combineReducers({
  resultsByAPI
});

export default reducer;
