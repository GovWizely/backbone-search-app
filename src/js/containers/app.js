import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { stringify } from 'querystring';
import { fetchResults } from '../actions/result';
import { updateWindow } from '../actions/window';
import apis from '../apis';

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {};
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

function mapStateToProps() {
  return { apis, window: {} };
}

function mapDispatchToProps(dispatch, ownProps) {
  const _apis = apis;
  return {
    dispatch,

    onFilter: () => {

    },
    onLoaded: () => {

    },
    onPaging: () => {

    },
    onResize: (e) => {
      const { innerWidth, innerHeight } = e.currentTarget;
      dispatch(updateWindow({ innerWidth, innerHeight }));
    },
    onSubmit: (values) => {
      let query = {
        q: values.q ? values.q : ''
      };
      let deckableApis = _.reduce(_apis, (output, api, uniqueId) => {
        if (api.deckable) output[uniqueId] = api;
        return output;
      }, {});
      dispatch(fetchResults(query, deckableApis));
      dispatch(updatePath(`/search?${stringify(query)}`));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
