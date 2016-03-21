import _ from 'lodash';
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
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    onLoaded: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    this.props.onResize({ currentTarget: window });
  },
  componentDidMount: function() {
    const { location, params, onLoaded } = this.props;
    onLoaded({ api: params.api, query: location.query });
    window.addEventListener('resize', this.props.onResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.props.onResize);
  },
  render: function() {
    return React.cloneElement(this.props.children, this.props);
  }
});

function mapStateToProps() {
  return { apis, window: {} };
}

function mapDispatchToProps(dispatch, ownProps) {
  const _apis = apis;
  let deckableAPIs = _.filter(_apis, (api) => api.deckable);

  return {
    dispatch,
    onExpand: (api, e) => {
      e.preventDefault();
      dispatch(selectAPIs(api));
      dispatch(updatePath());
    },
    onFilter: (filter) => {
      dispatch(updateQuery({ [filter.name]: filter.items, offset: 0 }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onLoaded: (options) => {
      let apis = _apis[options.api] ? _apis[options.api] : deckableAPIs;
      dispatch(selectAPIs(apis));
      dispatch(replaceQuery(options.query));
      dispatch(invalidateFilters());
      dispatch(fetchResults());
    },
    onPaging: (e) => {
      e.preventDefault();
      dispatch(updateQuery({ offset: e.target.dataset.offset }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(selectAPIs(deckableAPIs));
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
