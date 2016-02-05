import React, { PropTypes } from 'react';

import ResultListItem from './result-list-item';
import { findFirst } from '../utils/view-helper';

export default React.createClass({
  displayName: 'ResultList',
  propTypes: {
    displayedItems: PropTypes.number,
    formatter: PropTypes.func,
    items: PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      displayedItems: -1,
      items: []
    };
  },
  render: function() {
    const { displayedItems, formatter, items } = this.props;
    const slicedItems = displayedItems < 0 ? items : items.slice(0, displayedItems);
    return (
      <ul className="mi-list mi-result-list">
        { slicedItems.map(function(item, index) {
          if (formatter) item = formatter(item);
          return <ResultListItem key={ index } item={ item } />;
        }) }
      </ul>
    );
  }
});
