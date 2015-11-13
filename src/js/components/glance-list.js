import React from 'react';

import ListItem from './hypothesis-list-item';

export default React.createClass({
  displayName: 'List',
  propTypes: {
    highlightFirstItem: React.PropTypes.bool,
    itemKey: React.PropTypes.string,
    itemLimit: React.PropTypes.number,
    items: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      highlightFirstItem: false,
      itemKey: 'id',
      itemLimit: -1,
      items: []
    };
  },
  render: function() {
    let displayableItems = this.props.itemLimit == -1 ? this.props.items : this.props.items.slice(0, this.props.itemLimit);
    return (
      <section className="articles">
        { displayableItems.map(function(item) {
          return <ListItem key={ item[this.props.itemKey] } item = { item } />;
        }) }
      </section>
    );
  }
});
