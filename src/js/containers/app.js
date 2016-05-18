import { omit } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchResults } from '../actions/result';
import { replaceQuery } from '../actions/query';
import { updatePath } from '../actions/path';
import { updateWindow } from '../actions/window';
import { invalidateAllFilters } from '../actions/filter';
import { enableAPIs } from '../apis';

class App extends React.Component {
  componentWillMount() {
    this.props.onResize({ currentTarget: window });
  }
  componentDidMount() {
    window.addEventListener('resize', this.props.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.onResize);
  }
  render() {
    return React.cloneElement(this.props.children, omit(this.props, ['children']));
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onResize: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { apis, notifications, query } = state;
  const enabledAPIs = enableAPIs(apis);
  return {
    enabledAPIs,
    notifications,
    query,
    selectedAPIs: enabledAPIs,
    window: {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (query) => {
      dispatch(replaceQuery(query));
      if (query.q) {
        dispatch(invalidateAllFilters());

        dispatch(fetchResults());
      }
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
