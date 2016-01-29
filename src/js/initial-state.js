import _ from 'lodash';
import assign from 'object-assign';
import resources from './resources';

export default {
  filters: {
    isFetching: false,
    items: {}
  },
  results: _.reduce(
    resources, function(output, value) {
      output[value.stateKey] = {
        isFetching: false,
        items: [],
        metadata: {},
        aggregations: {}
      };
      return output;
    }, {}),
  query: {}
};
