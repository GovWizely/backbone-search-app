var $     = require('jquery');
var _     = require('lodash');
var React = require('react');

var ArticleActor = require('../actors/article-actor');
var ArticleStore = require('../stores/article-store');

module.exports = React.createClass({
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
  createNestedFilterOption: function(list, name, item, index) {
    return (
      <li className="list-group-item checkbox" key={ item }>
        <label><input onChange={ this.onFilter }name={ name } type="checkbox" value={ item } />{ item }</label>
        { this.createFilterList(list[item], name, this.createNestedFilterOption) }
      </li>
    );
  },
  createFilterOption: function(list, name, item, index) {
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
    var filters = _.reduce($('#filters input:checked'), function(results, checked, __) {
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
      }

      return results;
    }, { countries: [], industries: [], topics: [] });

    ArticleActor.filter(filters);
  },
  render: function() {
    return (
      <div id="filters">
        <section>
        <h5>Country</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.countries, 'country-filter', this.createFilterOption) }
      </div>
        </section>
        <section>
        <h5>Industry</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.industries, 'industry-filter', this.createNestedFilterOption) }
        </div>
        </section>
        <section>
        <h5>Topic</h5>
        <div className="overflow">
        { this.createFilterList(this.state.filters.topics, 'topic-filter', this.createNestedFilterOption) }
        </div>
        </section>
      </div>
    );
  }
});
