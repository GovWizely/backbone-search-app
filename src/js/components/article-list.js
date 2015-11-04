var _     = require('lodash');
var React = require('react');

var ArticleListItem = require('./article-list-item');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      articles: []
    };
  },
  render: function() {
    return (
      <section className="articles">
        { _.map(this.props.articles, function(article) {
          return <ArticleListItem key={ article.id } article={ article } />;
        })}
      </section>
    );
  }
});
