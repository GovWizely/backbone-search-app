import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { stringify } from 'querystring';
import { fetchResults } from '../actions/result';
import { updateQuery, replaceQuery } from '../actions/query';
import { updatePath } from '../actions/path';
import { updateWindow } from '../actions/window';
import { selectAPIs } from '../actions/api';
import { invalidateFilters } from '../actions/filter';
import apis from '../apis';

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onLoaded: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  },
  componentWillMount: function() {
    this.props.onResize({ currentTarget: window });
  },
  componentDidMount: function() {
    const { location, params, onLoaded } = this.props;
    if (location.path !== '') onLoaded({ apiName: params.api, query: location.query });
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
  const { notifications, query } = state;
  let selectedAPIs = _.filter(apis, (api) => api.deckable);
  return {
    availableAPIs: apis,
    defaultAPIs: selectedAPIs,
    notifications,
    query,
    selectedAPIs,
    window: {}
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const availableAPIs = apis,
        defaultAPIs = _.filter(apis, (api) => api.deckable);

  return {
    onLoaded: ({ apiName, query }) => {
      let apis = availableAPIs[apiName] ? availableAPIs[apiName] : defaultAPIs;
      dispatch(selectAPIs(apis));
      dispatch(replaceQuery(query));
      dispatch(invalidateFilters());
      dispatch(fetchResults());
    },
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(replaceQuery(query));
      dispatch(invalidateFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
