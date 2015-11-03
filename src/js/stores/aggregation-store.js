var _       = require('lodash');
var request = require('axios');

var parser  = require('../utils/aggregation-parser');

const ENDPOINT = 'https://pluto.kerits.org/v1/articles/count';

var _aggregations = {};

// Add aggregations options here. Use parser.parse if key is in /Parent/Child format.
var _setters = {
  countries: function(aggregations) {
    _aggregations.countries = aggregations.countries;
  },
  industries: function(aggregations) {
    _aggregations.industries = parser.parse(aggregations.industries);
  },
  topics: function(aggregations) {
    _aggregations.topics = parser.parse(aggregations.topics);
  }
};

module.exports = {
  get: function(type, callback) {
    if (_.isEmpty(_aggregations[type])) {
      this
        .fetch()
        .then(function(__) { callback(_aggregations[type]); });
    } else {
      callback(_aggregations[type]);
    }
  },
  getAll: function(callback) {
    if (_.isEmpty(_aggregations)) {
      this
        .fetch()
        .then(function(response) { callback(_aggregations); });
    } else {
      callback(_aggregations);
    }
  },
  fetch: function() {
    return request
      .get(ENDPOINT)
      .then(function(response) {
        _(response.data.aggregations)
          .chain()
          .keys()
          .each(function(key) {
            if (_setters.hasOwnProperty(key)) {
              _setters[key](response.data.aggregations);
            }
          })
          .value();
      });
  }
};
