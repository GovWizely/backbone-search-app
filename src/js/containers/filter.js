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
      return (
        <CheckboxTree
           disabled={ disabled }
           key={ key } name={ key } label={ _.capitalize(key) }
           items={ filters }
           onChange={ onChange }
           values={ values[key] } />
      );
    });

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
        <h4 className="">Filter Results</h4>
        { checkboxTrees }
      </div>
    );
  }
});

export default Filter;
