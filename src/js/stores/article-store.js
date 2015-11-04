var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');
var parser      = require('../utils/aggregation-parser');

var ENDPOINT = 'https://pluto.kerits.org/v1/articles/search';

var _articles     = {},
    _aggregations = {},
    _metadata     = {},
    _query        = {};

var _setMetadata = function(metadata) {
  _metadata = metadata;
};

var _setArticles = function(articles) {
  _articles = articles;
};

var _setAggregations = function(aggregations) {
  _aggregations.countries  = _.reduce(aggregations.countries, function(results, country, key) {
    results[country.key] = country.key;
    return results;
  }, {});
  _aggregations.industries = parser.parseAsTree(aggregations.industries);
  _aggregations.topics     = parser.parseAsTree(aggregations.topics);
};

var _setQuery = function(query) {
  _query = query;
};

var ArticleStore = function(dispatcher) {
  Store.call(this, dispatcher);
};

ArticleStore.prototype = assign({}, Store.prototype, {

  getArticles: function() {
    return _.clone(_articles);
  },

  getAggregations: function() {
    return _.clone(_aggregations);
  },

  getMetadata: function() {
    return _.clone(_metadata);
  },

  getQuery: function() {
    return _.clone(_query);
  },

  __onDispatch: function(action) {
    switch(action.type) {
    case ActionTypes.SEARCH:
      if (_.isEmpty(action.query)) return null;

      _setQuery(action.query);
      return request
        .get(ENDPOINT, {
          params: _query
        })
        .then(function(response) {
          _setArticles(response.data.results);
          _setMetadata(response.data.metadata);
          _setAggregations(response.data.aggregations);

          this.__emitChange();
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });

    case ActionTypes.FILTER:
      var filterParams = _.reduce(action.filters, function(h, value, key) {
        if (value.length) {
          h[key] = value.join(',');
        }
        return h;
      }, { offset: 0 });

      return request
        .get(ENDPOINT, {
          params: assign({}, _query, filterParams)
        })
        .then(function(response) {
          _setArticles(response.data.results);
          _setMetadata(response.data.metadata);

          this.__emitChange();
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });

    case ActionTypes.PAGING:
      return request
        .get(ENDPOINT, { params: assign({}, _query, { offset: 0 })})
        .then(function(response) {
          _setArticles(response.data.results);

          this.__emitChange();
        }.bind(this));

    default:
      return null;
    }
  }
});

ArticleStore.prototype.constructor = ArticleStore;

var store = new ArticleStore(Dispatcher);
module.exports = store;
