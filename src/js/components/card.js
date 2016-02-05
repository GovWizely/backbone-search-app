import React, { PropTypes } from 'react';

import { formatResult } from '../utils/view-helper';
import ResultList from './result-list';

var Card = React.createClass({
  displayName: 'Card',
  propTypes: {
    displayedItems: PropTypes.number,
    formatter: PropTypes.func,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    url: PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      displayedItems: 3,
      items: [],
      label: 'Untitled'
    };
  },
  handleClick: function(e) {
    const { onClick, id } = this.props;
    onClick(e, id);
  },
  render: function() {
    const { displayedItems, formatter, id, items, label, url } = this.props;
    return (
      <section className="mi-card">
        <h4 className="title">{ label }</h4>
        <ResultList displayedItems={ 3 } formatter={ formatter } items={ items } />
        <div className="show-more">
          <a href={ url }>See More { label }</a>
        </div>
      </section>
    );
  }
});

export default Card;
