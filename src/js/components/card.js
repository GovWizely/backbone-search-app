import React, { PropTypes } from 'react';

import { findFirst } from '../utils/view-helper';

const config = {
  count: 5
};

var Card = React.createClass({
  displayName: 'Card',
  getDefaultProps: function() {
    return {
      items: [],
      label: 'Untitled'
    };
  },
  handleClick: function(e) {
    const { onClick, id } = this.props;
    onClick(e, id);
  },
  render: function() {
    const { fields, items, label, url } = this.props;
    return (
      <section className="card">
        <h4 className="text-muted">{ label }</h4>
        <ul className="list-group">
          {
            items.slice(0, config.count).map(function(item) {
              return (
                  <li className="list-group-item" key={ findFirst(item, fields.key)}>
                  <a target="_blank" href={ findFirst(item, fields.url ) }>{ findFirst(item, fields.title) }</a>
                  </li>
              );
            })
          }
        </ul>
        <a href={ url }>Show More for { label }</a>
      </section>
    );
  }
});

Card.propTypes = {
  fields: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  url: PropTypes.string.isRequired

};

export default Card;
