var Dispatcher   = require('../dispatcher/dispatcher');
var ActionTypes  = require('../constants/constants').ActionTypes;

module.exports = {
  search: function(query) {
    Dispatcher.dispatch({
      type:  ActionTypes.SEARCH,
      query: query
    });
  },

  filter: function(filters) {
    Dispatcher.dispatch({
      type:    ActionTypes.FILTER,
      filters: filters
    });
  },

  paging: function(offset) {
    Dispatcher.dispatch({
      type:     ActionTypes.PAGING,
      offset:   offset
    });
  }
};
