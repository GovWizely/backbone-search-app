var _       = require('lodash');
var assign  = require('object-assign');
var request = require('axios');

var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var Store       = require('./store');
var parser      = require('../utils/aggregation-parser');

var tradeAPIKey = 'hSLqwdFz1U25N3ZrWpLB-Ld4';

var endpoints = {
  countryFactSheet: '',
  salesforceArticle: 'https://pluto.kerits.org/v1/articles/search',
  tradeEvent: 'https://api.trade.gov/trade_events/search?api_key=' + tradeAPIKey,
  tradeLead: 'https://api.trade.gov/trade_leads/search?api_key=' + tradeAPIKey
};

var _articles     = [],
    _aggregations = {},
    _metadata     = {},
    _query        = {};

var _setMetadata = function(metadata) {
  _metadata = metadata;
};

var _setArticles = function(articles) {
  _articles = articles;
};

var _getArticles = function(params) {
  var getCountryFactSheets = function() {};
  var getTradeEvents = function() {
    return request
      .get(endpoints.tradeEvent, { params: params });
  };
  var getTradeLeads = function() {
    return request
      .get(endpoints.tradeLead, { params: params });
  };
  var getSalesforceArticles = function() {
    return request
      .get(endpoints.salesforceArticle, { params: params });
  };

  return request.all([getSalesforceArticles(), getTradeEvents(), getTradeLeads()])
    .then(request.spread(function(sf, te, tl) {
      _.each(te.data.results, (result) => {
        result.type = result.source;
        result.title = result.event_name;
        result.snippet = result.description;
      });
      _.each(tl.data.results, (result) => {
        result.type = result.source;
        result.snippet = result.description;
      });
      _setArticles(sf.data.results.concat(te.data.results.concat(tl.data.results)));
      sf.data.metadata.total = sf.data.metadata.total + te.data.total + tl.data.total;
      _setMetadata(sf.data.metadata);
      _setAggregations(sf.data.aggregations);
    }));
};

var _setAggregations = function(aggregations) {
  _aggregations.countries  = _.reduce(aggregations.countries, function(results, country, key) {
    results[country.key] = country.key;
    return results;
  }, {});
  _aggregations.types  = _.reduce(aggregations.types, function(results, type, key) {
    results[type.key] = type.key;
    return results;
  }, {});
  _aggregations.topics     = parser.parseAsTree(aggregations.topics);
  _aggregations.industries = parser.parseAsTree(aggregations.industries);
};

var _setQuery = function(query) {
  if (_.isEmpty(query)) {
    _query = { q: '' };
  }
  else {
    _query = query;
  }

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
      _setQuery(action.query);
      return _getArticles(_query)
        .then(function() {
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
        .get(ENDPOINT, { params: assign({}, _query, { offset: 0 }) })
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
