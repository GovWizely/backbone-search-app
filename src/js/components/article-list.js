var _     = require('lodash');
var React = require('react');

var ArticleListItem = require('./article-list-item');

module.exports = React.createClass({
  displayName: 'ArticleList',
  propTypes: {
    articles: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      articles: []
    };
  },
  renderItem: function(article) {
    return (
      <ArticleListItem key={ article.id } article={ article } />
    );
  },
  render: function() {
    return (
      <section className="articles">
        { _.map(this.props.articles, this.renderItem) }
      </section>
    );
  }
});
