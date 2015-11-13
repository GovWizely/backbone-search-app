var _     = require('lodash');
var React = require('react');

var ResultListItem = require('./result-list-item');

module.exports = React.createClass({
  displayName: 'ResultList',
  propTypes: {
    itemLimit: React.PropTypes.number,
    items: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      items: [],
      itemLimit: -1
    };
  },
  render: function() {
    let displayableItems = this.props.itemLimit === -1 ? this.props.items : this.props.items.slice(0, this.props.itemLimit);
    return (
      <section className="articles">
        { displayableItems.map(function(item) {
            return <ResultListItem key={ item.id || item.title } item={ item } />;
        }) }
      </section>
    );
  }
});
