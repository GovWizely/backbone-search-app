var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  _onChange: function() {
    this.setState(
      { total: Math.ceil(ArticleStore.getMetadata().total / this.props.pageSize) }
    );
    this.setState(
      { current: ArticleStore.getMetadata().offset / this.props.pageSize + 1 }
    );
  },
  getDefaultProps: function() {
    return {
      pageSize: 10,
      pageRange: 10
    };
  },
  getInitialState: function() {
    return {
      total: 0,
      current: 1
    };
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  handleClick: function(e) {
    e.preventDefault();
    this.props.history.pushState(null, '/search', _.assign({}, ArticleStore.getQuery(), { offset: e.target.dataset.offset}));

  },
  pages: function() {
    if (this.state.total <= this.props.pageRange) {
      return _.range(1, this.state.total + 1);
    }
    var pivot = Math.ceil((this.props.pageRange + 1) / 2);
    var head = this.state.current - pivot + 1;
    var tail = this.state.current + this.props.pageRange;
    return _.chain(_.range(head, tail))
      .filter(function(x) { return x > 0})
      .take(this.props.pageRange)
      .value();
  },
  previousPage: function() {
    return this.state.current - 1 || 1;
  },
  nextPage: function() {
    if (this.state.current === this.state.total) {
      return this.state.total;
    }
    return this.state.current + 1;
  },
  offset: function(i) {
    return (i - 1) * this.props.pageSize;
  },
  url: function(i) {
    var params = ArticleStore.getQuery();
    params.offset = this.offset(i);
    return 'search?' + $.param(params);
  },
  createPage: function(i, isActive) {
    return (
      <li key={ i } className={ isActive ? 'active' : '' }>
        <a onClick={ this.handleClick } href={ this.url(i) } data-offset={ this.offset(i) }>{ i }</a>
      </li>
    );
  },
  createPageRange: function() {
    var pages = [];
    _.forEach(this.pages(), function(i) {
      pages.push(this.createPage(i, this.state.current === i));
    }.bind(this));
    return pages;
  },
  render: function() {
    return (
      <nav>
        <ul className="pagination">
          <li>
            <a href={ this.url(1) } aria-label="First" className="fa fa-angle-double-left"></a>
          </li>
          <li>
            <a href={ this.url(this.previousPage()) } aria-label="Previous" className="fa fa-angle-left"></a>
          </li>
          { this.createPageRange() }
          <li>
            <a href={ this.url(this.nextPage()) } aria-label="Next" className="fa fa-angle-right"></a>
          </li>
          <li>
            <a href={ this.url(this.state.total) } aria-label="Last" className="fa fa-angle-double-right"></a>
          </li>
        </ul>
      </nav>
    );
  }
});
