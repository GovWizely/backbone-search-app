var React = require('react');

module.exports = React.createClass({
  displayName: 'ResultListItem',
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  render: function() {
    var tokens = this.props.item.snippet.split(' ');
    if (tokens.length >= 60) {
      this.props.item.snippet = tokens.slice(0, 60).join(' ').concat(' ...');
    }
    return (
      <article className="article">
        <h1 className="title">
          <a target="_blank" href={ this.props.item.url } dangerouslySetInnerHTML={ { __html: this.props.item.title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ this.props.item.url }>{ this.props.item.url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: this.props.item.snippet } }></p>
        <ul className="list-inline small text-info">
          <li className="text-info">
            { this.props.item.type }
          </li>
        </ul>
      </article>
    );
  }
});
