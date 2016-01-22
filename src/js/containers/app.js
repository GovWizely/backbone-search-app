import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { stringify } from 'querystring';

function parseFormData(form) {
  const { q } = form;
  const query = form.q ? { q } : {};

  return query;
}

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  handleSubmit: function(form) {
    let query = parseFormData(form);
    const path = `/search?${stringify(query)}`;
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
