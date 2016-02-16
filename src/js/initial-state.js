import _ from 'lodash';
import assign from 'object-assign';
import apis from './apis';

export default {
  filters: {
    isFetching: false,
    items: {}
  },
  results: _.reduce(
    apis, function(output, value) {
      output[value.uniqueId] = {
        isFetching: false,
        items: [],
        metadata: {},
        aggregations: {}
      };
      return output;
    }, {}),
  query: {}
};
