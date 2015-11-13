var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  displayName: 'Pagination',
  propTypes: {
    history: React.PropTypes.object.isRequired,
    pageRange: React.PropTypes.number,
    pageSize: React.PropTypes.number
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
  _onChange: function() {
    this.setState(
      { total: Math.ceil(ArticleStore.getMetadata().total / this.props.pageSize) }
    );
    this.setState(
      { current: ArticleStore.getMetadata().offset / this.props.pageSize + 1 }
    );
  },
  handleClick: function(e) {
    e.preventDefault();
    var query = _.assign({}, ArticleStore.getQuery(), { offset: e.target.dataset.offset });
    this.props.history.pushState(query, '/search', query);
  },
  pages: function() {
    if (this.state.total <= this.props.pageRange) {
      return _.range(1, this.state.total + 1);
    }
    var leftMarginOffset = 2;
    var pivot = Math.ceil((this.props.pageRange + 1) / 2);
    var leftMargin = pivot - (this.state.total - this.state.current) - leftMarginOffset;
    var head = this.state.current - (pivot + (leftMargin < 0 ? 0 : leftMargin)) + 1;
    var tail = this.state.current + this.props.pageRange;

    return _(_.range(head, tail))
      .filter(x => x > 0 && x <= this.state.total)
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
  createArrowAnchor: function(i, className, disabled = false) {
    var listCss = disabled ? 'disabled' : '';
    return (
      <li className={ listCss }>
        <a className={ className } onClick={ this.handleClick } href={ this.url(i) } data-offset={ this.offset(i) }></a>
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
          { this.createArrowAnchor(1, 'fa fa-angle-double-left', (this.state.current === 1)) }
          { this.createArrowAnchor(this.previousPage(), 'fa fa-angle-left', (this.state.current === 1)) }
          { this.createPageRange() }

          { this.createArrowAnchor(this.nextPage(), 'fa fa-angle-right', (this.state.current === this.state.total)) }
          { this.createArrowAnchor(this.state.total, 'fa fa-angle-double-right', (this.state.current === this.state.total)) }
        </ul>
      </nav>
    );
  }
});
