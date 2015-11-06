var _     = require('lodash');
var React = require('react');

var ExpandedForm     = require('./expanded-form');
var CondensedForm    = require('./condensed-form');
var ArticleStore     = require('../stores/article-store');
var AggregationStore = require('../stores/aggregation-store');

module.exports = React.createClass({
  displayName: 'Form',
  _onChange: function() {
    this.setState({
      keyword    : ArticleStore.getQuery().q          || '',
      countries  : ArticleStore.getQuery().countries  || '',
      industries : ArticleStore.getQuery().industries || ''
    });
  },
  getDefaultProps: function() {
    return {
      expanded : true
    };
  },
  getInitialState: function() {
    return {
      keyword      : ArticleStore.getQuery().q          || '',
      countries    : ArticleStore.getQuery().countries  || '',
      industries   : ArticleStore.getQuery().industries || '',
      aggregations : {}
    };
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  componentWillMount: function() {
    AggregationStore.getAll(function(aggregations) {
      this.setState({ aggregations: aggregations });
    }.bind(this));
  },
  handleSubmit: function() {
    var query = _.pick({
      q: this.state.keyword,
      countries: this.state.countries,
      industries: this.state.industries
    }, _.identity);

    this.props.history.pushState(
      query, '/search', query);
  },
  handleKeywordChange: function(e) {
    this.setState({ keyword: e.target.value });
  },
  handleCountryChange: function(values) {
    this.setState({ countries: values });
  },
  handleIndustryChange: function(values) {
    this.setState({ industries: values });
  },
  view: function() {
    var props = {
      keyword          : this.state.keyword,
      countries        : this.state.countries,
      industries       : this.state.industries,
      aggregations     : this.state.aggregations,
      onKeywordChange  : this.handleKeywordChange,
      onCountryChange  : this.handleCountryChange,
      onIndustryChange : this.handleIndustryChange,
      onSubmit         : this.handleSubmit
    };
    if (!this.props.expanded) {
      return <CondensedForm {...props} />;
    } else {
      return <ExpandedForm {...props} />;
    }
  },
  render: function() {
    return this.view();
  }
});
