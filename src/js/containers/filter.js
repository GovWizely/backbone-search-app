import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';

var Filter = React.createClass({
  displayName: 'Filter',
  propTypes: {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    const { filters, onChange } = this.props;
    if (!filters) return null;

    const countrySeparator = _.isEmpty(filters.countries) ? null : <hr />;
    const industrySeparator = _.isEmpty(filters.industries) ? null : <hr />;

    return (
      <div>
        <h4 className="uk-text-muted">Filter Results</h4>
        <div>
          <CheckboxTree
            id="filter-countries" label="Country"
            items={ filters.countries }
            itemLimit={ 5 }
            onChange={ onChange } />
          { countrySeparator }
          <CheckboxTree
            id="filter-industries" label="Industry"
            items={ filters.industries } nested
            onChange={ onChange } />
          { industrySeparator }
          <CheckboxTree
            id="filter-topics" label="Topic"
            items={ filters.topics } nested
            onChange={ onChange } />
        </div>
      </div>
    );
  }
});

export default Filter;
