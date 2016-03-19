import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';
import Spinner from '../components/spinner';

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

    const checkboxTrees = _.map(items, function(filters, key) {
      return [
        <CheckboxTree
           disabled={ disabled }
           key={ key } name={ key } label={ _.startCase(key) }
           items={ filters }
           onChange={ onChange }
           values={ query[key] } />
      ];
    });

    return (
      <div>
        <header className="">Filter Results</header>
        { checkboxTrees }
      </div>
    );
  }
});

export default Filter;
