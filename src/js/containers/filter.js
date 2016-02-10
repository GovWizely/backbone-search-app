import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';
import Spinner from '../components/spinner';

function parseFilterQuery(query, filters) {
  let values = {};
  _.map(filters, function(o, filter) {
    values[filter] = query[filter] ? query[filter] : [];
    if(!_.isArray(values[filter])) values[filter] = [values[filter]];
  });
  return values;
}

var Filter = React.createClass({
  displayName: 'Filter',
  propTypes: {
    disabled: PropTypes.bool,
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    query: PropTypes.object
  },
  getDefaultProps: function() {
    return {
      disabled: false
    };
  },
  render: function() {
    const { disabled, filters: { isFetching, items }, onChange, query } = this.props;

    if (!items) return null;

    const values = parseFilterQuery(query, items);

    const checkboxTrees = _.map(items, function(filters, key) {
      return [
        <CheckboxTree
           disabled={ disabled }
           key={ key } name={ key } label={ _.startCase(key) }
           items={ filters }
           onChange={ onChange }
           values={ values[key] } />
      ];
    });

    return (
      <div>
        <h4 className="">Filter Results</h4>
        { checkboxTrees }
      </div>
    );
  }
});

export default Filter;
