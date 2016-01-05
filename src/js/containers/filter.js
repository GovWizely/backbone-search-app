import _ from 'lodash';
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

    const countrySeparator = _.isEmpty(aggregations.countries) ? null : <hr />;
    const industrySeparator = _.isEmpty(aggregations.industries) ? null : <hr />;

    return (
      <div>
        <h4 className="uk-text-muted">Filter Results</h4>
        <div id="filters">
          <CheckboxTree
            id="filter-countries" label="Country"
            items={ aggregations.countries }
            itemLimit={ 5 }
            onChange={ onChange } />
          { countrySeparator }
          <CheckboxTree
            id="filter-industries" label="Industry"
            items={ aggregations.industries } nested
            onChange={ onChange } />
          { industrySeparator }
          <CheckboxTree
            id="filter-topics" label="Topic"
            items={ aggregations.topics } nested
            onChange={ onChange } />
        </div>
      </div>
    );
  }
});

export default Filter;
