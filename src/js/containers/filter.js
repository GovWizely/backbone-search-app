import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';

var Filter = React.createClass({
  displayName: 'Filter',
  render: function() {
    const { aggregations, onChange } = this.props;
    if (!aggregations) return null;
    return (
      <div>
        <h4 className="text-muted">Filter Results</h4>
        <div id="filters">
          <CheckboxTree
            id="filter-countries" cssClass="filter" label="Country"
            items={ aggregations.countries }
            onChange={ onChange } />
          <CheckboxTree
            id="filter-industries" cssClass="filter" label="Industry"
            items={ aggregations.industries } nested
            onChange={ onChange } />
          <CheckboxTree
            id="filter-topics" cssClass="filter" label="Topic"
            items={ aggregations.topics } nested
            onChange={ onChange } />
        </div>
      </div>
    );
  }
});

Filter.propTypes = {
  aggregations: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Filter;
