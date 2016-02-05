import React, { PropTypes } from 'react';

import { formatResult } from '../utils/view-helper';

var Card = React.createClass({
  displayName: 'Card',
  propTypes: {
    displayedItems: PropTypes.number,
    fields: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    url: PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      displayedItems: 5,
      items: [],
      label: 'Untitled'
    };
  },
  handleClick: function(e) {
    const { onClick, id } = this.props;
    onClick(e, id);
  },
  render: function() {
    const { displayedItems, fields, id, items, label, url } = this.props;
    return (
      <section className="mi-card">
        <h4 className="title">{ label }</h4>
        <ul className="mi-list">
          {
            items.slice(0, displayedItems).map(function(item, index) {
              const result = formatResult(item, fields);
              return (
                  <li className="mi-list-item" key={ index }>
                    <a target="_blank" href={ result.url } dangerouslySetInnerHTML={ { __html: result.title } }></a>
                    <div>
                      <span className="source">{ result.source }</span>
                    </div>
                  </li>
              );
            })
          }
        </ul>
        <div className="show-more">
          <a href={ url }>See More { label }</a>
        </div>
      </section>
    );
  }
});

export default Card;
