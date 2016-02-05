import React, { PropTypes } from 'react';

import ResultListItem from './result-list-item';
import { findFirst } from '../utils/view-helper';

export default React.createClass({
  displayName: 'ResultList',
  propTypes: {
    fields: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      items: []
    };
  },
  render: function() {
    const { items, fields } = this.props;
    return (
      <section className="mi-result-list">
        { items.map(function(item, index) {
          return <ResultListItem key={ index } item={ item } fields={ fields }/>;
        }) }
      </section>
    );
  }
});
