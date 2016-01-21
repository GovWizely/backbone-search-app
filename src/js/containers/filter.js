import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';
import Spinner from '../components/spinner';

function parseFilterQuery(query) {
  let values = {};
  ['countries', 'industries', 'topics'].forEach(function(filter) {
    values[filter] = query[filter] ? query[filter] : [];
    if(!_.isArray(values[filter])) values[filter] = [values[filter]];
  });
  return values;
}

var Filter = React.createClass({
  displayName: 'Filter',
  propTypes: {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    query: PropTypes.object
  },
  render: function() {
    const { filters: { isFetching, items }, onChange, query } = this.props;

    if (!items) return null;

    const values = parseFilterQuery(query);

    const countrySeparator = _.isEmpty(items.countries) ? null : <hr />;
    const industrySeparator = _.isEmpty(items.industries) ? null : <hr />;
    const content = isFetching ? <Spinner /> : (
      <div>
        <CheckboxTree
           name="countries" label="Country"
           items={ items.countries }
           itemLimit={ 5 }
           onChange={ onChange }
           values={ values.countries } />
        { countrySeparator }
        <CheckboxTree
           name="industries" label="Industry"
           items={ items.industries } nested
           onChange={ onChange }
           values={ values.industries } />
        { industrySeparator }
        <CheckboxTree
           name="topics" label="Topic"
           items={ items.topics } nested
           onChange={ onChange }
           values={ values.topics } />
      </div>);

    return (
      <div>
        <h4 className="uk-text-muted">Filter Results</h4>
        { content }
      </div>
    );
  }
});

export default Filter;
