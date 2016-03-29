import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';

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
    const { disabled, filters, onChange, query } = this.props;
    if (!filters || _.isEmpty(filters)) return null;
    const checkboxTrees = _.map(filters, (filter, key) => {
      const values = Array.isArray(query[key]) ? query[key] : [];
      return (
        <CheckboxTree
           disabled={ filter.isFetching }
           key={ key } name={ key } label={ _.startCase(key) }
           items={ filter.items }
           onChange={ onChange }
           defaultValues={ values } />
      );
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
