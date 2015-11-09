var _ = require('lodash');

module.exports = function(taskname, config) {
  if (Array.isArray(taskname)) {
    return _.map(taskname, function(name) {
      return config.default ? name : name + ':' + config.env;
    });
  } else {
    return config.default ? taskname : taskname + ':' + config.env;
  }
};
