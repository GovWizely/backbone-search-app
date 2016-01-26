import React, { PropTypes } from 'react';

import { formatResult } from '../utils/view-helper';

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
      <section className="uk-panel uk-panel-box uk-width-1-3">
        <h4 className="text-muted">{ label }</h4>
        <ul className="mi-list">
          {
            items.slice(0, config.count).map(function(item) {
              const result = formatResult(item, fields);
              return (
                  <li className="mi-list-item" key={ result.key }>
                    <a target="_blank" href={ result.url }>{ result.title }</a>
                    <div>
                      <span className="source">{ result.source }</span>
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
