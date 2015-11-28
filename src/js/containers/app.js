import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { stringify } from 'querystring';
import { fetchAggregations } from '../actions/aggregation';

function parseFormData(form) {
  const { q, countries, industries } = form;
  let query = {};
  if (q) query.q = q;
  if (!_.isEmpty(countries)) query.countries = countries;
  if (!_.isEmpty(industries)) query.industries = industries;
  return query;
}

function screen(query) {
  if (_.isEmpty(query.q) && !_.isEmpty(query.countries) && !_.isEmpty(query.industries)) {
    return '/adhoc_report/articles';
  }
  return '/search';
}

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    aggregations: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount: function() {
    this.props.dispatch(fetchAggregations());
  },
  handleSubmit: function(form) {
    let query = parseFormData(form);
    const path = `${screen(query)}?${stringify(query)}`;
    this.props.dispatch(updatePath(path));
  },
  render: function() {
    var props = {
      aggregations: this.props.aggregations.data,
      onSubmit: this.handleSubmit
    };
    return (
      <div>
        { React.cloneElement(this.props.children, props) }
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { aggregations, form } = state;

  return {
    aggregations,
    form
  };
}

export default connect(mapStateToProps)(App);
