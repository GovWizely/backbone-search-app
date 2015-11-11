var React = require('react');

module.exports = React.createClass({
  displayName: 'ArticleListItem',
  propTypes: {
    article: React.PropTypes.object.isRequired
  },
  render: function() {
    var tokens = this.props.article.snippet.split(' ');
    if (tokens.length >= 60) {
      this.props.article.snippet = tokens.slice(0, 60).join(' ').concat(' ...');
    }
    return (
      <article className="article">
        <h1 className="title">
          <a target="_blank" href={ this.props.article.url } dangerouslySetInnerHTML={ { __html: this.props.article.title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ this.props.article.url }>{ this.props.article.url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: this.props.article.snippet } }></p>
        <ul className="list-inline small text-info">
          <li className="text-info">
            { this.props.article.type }
          </li>
        </ul>
      </article>
    );
  }
});
