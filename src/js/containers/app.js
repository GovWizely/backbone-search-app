import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { stringify } from 'querystring';
import {
  invalidateQueryExpansions, fetchQueryExpansionsIfNeeded } from '../actions/query_expansion';
import { fetchResults } from '../actions/result';
import { updateQuery, replaceQuery } from '../actions/query';
import { updatePath } from '../actions/path';
import { updateWindow } from '../actions/window';
import { selectAPIs } from '../actions/api';
import { invalidateAllFilters } from '../actions/filter';
import apis from '../apis';

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onResize: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    this.props.onResize({ currentTarget: window });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.props.onResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.props.onResize);
  },
  render: function() {
    return React.cloneElement(this.props.children, this.props);
  }
});

function mapStateToProps(state) {
  const { notifications, query, queryExpansions } = state;
  let selectedAPIs = _.filter(apis, (api) => api.deckable);
  return {
    availableAPIs: apis,
    defaultAPIs: selectedAPIs,
    notifications,
    query,
    queryExpansions,
    selectedAPIs,
    window: {}
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const availableAPIs = apis,
        defaultAPIs = _.filter(apis, (api) => api.deckable);

  return {
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(replaceQuery(query));

      dispatch(invalidateAllFilters());
      dispatch(invalidateQueryExpansions());

      dispatch(fetchResults());
      dispatch(fetchQueryExpansionsIfNeeded(query));

      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
