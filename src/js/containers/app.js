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
  return '/search';
}

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  handleSubmit: function(form) {
    let query = parseFormData(form);
    const path = `${screen(query)}?${stringify(query)}`;
    this.props.dispatch(updatePath(path));
  },
  render: function() {
    var props = {
      onSubmit: this.handleSubmit
    };
    return React.cloneElement(this.props.children, props);
  }
});

export default connect()(App);
