var _ = require('lodash');

module.exports = {
  parseAsTree: function(records) {
    var results = {};
    var subdivide = function(array, items) {
      var key = array.shift();
      items[key] = items[key] || {};

      if (array.length) { return subdivide(array, items[key]); }

      return items;
    };
    _.each(records, function(record) {
      var array = record.key.substring(1).split('/');
      subdivide(array, results);
    });
    return results;
  },
  parse: function(records) {
    return _.map(records, function(record) {
      var array = record.key.substring(1).split('/');
      return { key: array[array.length - 1], doc_count: record.doc_count };
    });
  }
};
