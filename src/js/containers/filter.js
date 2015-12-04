import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';

var Filter = React.createClass({
  displayName: 'Filter',
  propTypes: {
    aggregations: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    const { aggregations, onChange } = this.props;
    if (!aggregations) return null;
    return (
      <div>
        <h4 className="text-muted">Filter Results</h4>
        <div id="filters">
          <CheckboxTree
            id="filter-countries" label="Country"
            items={ aggregations.countries }
            onChange={ onChange } />
          <hr />
          <CheckboxTree
            id="filter-industries" label="Industry"
            items={ aggregations.industries } nested
            onChange={ onChange } />
          <hr />
          <CheckboxTree
            id="filter-topics" label="Topic"
            items={ aggregations.topics } nested
            onChange={ onChange } />
          <hr />
        </div>
      </div>
    );
  }
});

export default Filter;
