var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <article className="article">
        <h1 className="title">
          <a target="_blank" href={ this.props.article.url } dangerouslySetInnerHTML={ { __html: this.props.article.title } }></a>
        </h1>
        <p className="url"><a target="_blank" href={ this.props.article.url }>{ this.props.article.url }</a></p>
        <p className="snippet" dangerouslySetInnerHTML={ { __html: this.props.article.snippet } }></p>
      </article>
    );
  }
});
