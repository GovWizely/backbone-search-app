import _ from 'lodash';
import React, { PropTypes } from 'react';
import CheckboxTree from '../components/checkbox-tree';
import Spinner from '../components/spinner';

var Filter = React.createClass({
  displayName: 'Filter',
  propTypes: {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  },
  render: function() {
    const { filters: { isFetching, items }, onChange } = this.props;
    if (!items) return null;

    const countrySeparator = _.isEmpty(items.countries) ? null : <hr />;
    const industrySeparator = _.isEmpty(items.industries) ? null : <hr />;

    const content = isFetching ? <Spinner /> : (
      <div>
        <CheckboxTree
           name="countries" label="Country"
           items={ items.countries }
           itemLimit={ 5 }
           onChange={ onChange } />
        { countrySeparator }
        <CheckboxTree
           name="industries" label="Industry"
           items={ items.industries } nested
           onChange={ onChange } />
        { industrySeparator }
        <CheckboxTree
           name="topics" label="Topic"
           items={ items.topics } nested
           onChange={ onChange } />
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
