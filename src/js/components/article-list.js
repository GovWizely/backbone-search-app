var _     = require('lodash');
var React = require('react');

var ArticleStore    = require('../stores/article-store');
var ArticleListItem = require('./article-list-item');
var Spinner         = require('./spinner');

module.exports = React.createClass({
  _onChange: function() {
    this.setState({ articles  : ArticleStore.getArticles() });
    this.setState({ isLoading : false });
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  getInitialState: function() {
    return {
      articles: ArticleStore.getArticles(),
      isLoading: true
    };
  },
  render: function() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    return (
      <section className="articles">
        { _.map(this.state.articles, function(article) {
          return <ArticleListItem key={ article.id } article={ article } />;
        })}
      </section>
    );
  }
});
