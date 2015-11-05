var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
  displayName: 'Filters',
  _onChange: function() {
    this.setState({ filters: ArticleStore.getAggregations() });
  },
  getInitialState: function() {
    return {
      filters: ArticleStore.getAggregations()
    };
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeListener(this._onChange);
  },
  createNestedFilterOption: function(list, name, item) {
    return (
      <li className="list-group-item checkbox" key={ item }>
        <label><input onChange={ this.onFilter }name={ name } type="checkbox" value={ item } />{ item }</label>
        { this.createFilterList(list[item], name, this.createNestedFilterOption) }
      </li>
    );
  },
  createFilterOption: function(list, name, item) {
    return (
      <li className="list-group-item checkbox" key={ item }>
        <label><input onChange={ this.onFilter } name={ name } type="checkbox" value={ item } />{ item }</label>
      </li>
    );
  },
  createFilterList: function(list, name, callback) {
    if (_.isEmpty(list)) return null;
    return (
      <ul className="list-group">
        { _.keys(list).map(callback.bind(null, list, name)) }
      </ul>
    );
  },
  onFilter: function(e) {
    var filters = _.reduce($('#filters input:checked'), function(results, checked) {
      switch(checked.name) {
      case 'country-filter':
        results.countries.push(checked.value);
        break;

      case 'industry-filter':
        results.industries.push(checked.value);
        break;

      case 'topic-filter':
        results.topics.push(checked.value);
        break;

      case 'type-filter':
        results.types.push(checked.value);
        break;
      }

      return results;
    }, { countries: [], industries: [], topics: [], types: [] });

    ArticleActor.filter(filters);
  },
  renderSection: function(id, label, list, generator) {
    var target = '#' + id;
    return (
      <section>
        <h5>
          <a role="button" data-toggle="collapse" href={ target } aria-expanded={ true } aria-controls={ id }>{ label }</a>
        </h5>
        <div className="collapse in overflow" id={ id }>
          { this.createFilterList(list, id, generator) }
        </div>
      </section>
    );
  },
  render: function() {
    return (
      <div id="filters">
        { this.renderSection('country-filter', 'Country', this.state.filters.countries, this.createFilterOption) }
        { this.renderSection('industry-filter', 'Industry', this.state.filters.industries, this.createNestedFilterOption) }
        { this.renderSection('topic-filter', 'Topic', this.state.filters.topics, this.createNestedFilterOption) }
        { this.renderSection('type-filter', 'Type', this.state.filters.types, this.createFilterOption) }
      </div>
    );
  }
});
