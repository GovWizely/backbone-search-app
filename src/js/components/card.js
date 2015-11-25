import React, { PropTypes } from 'react';

import { findFirst } from '../utils/view-helper';

const config = {
  count: 5
};

var Card = React.createClass({
  displayName: 'Card',
  propTypes: {
    fields: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    label: PropTypes.string,
    onClick: PropTypes.func,
    url: PropTypes.string.isRequired
  },
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
        <ul className="card-list">
          {
            items.slice(0, config.count).map(function(item) {
              return (
                  <li className="card-list-item" key={ findFirst(item, fields.key)}>
                    <a target="_blank" href={ findFirst(item, fields.url ) }>{ findFirst(item, fields.title) }</a>
                    <div>
                      <span className="source">{ findFirst(item, fields.source) }</span>
                    </div>
                  </li>
              );
            })
          }
        </ul>
        <div>
          <a className="show-more" href={ url }>Show All { label }</a>
        </div>
      </section>
    );
  }
});

export default Card;
