import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { stringify } from 'querystring';
import { fetchResults } from '../actions/result';

var App = React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    this.handleResize({ currentTarget: window });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleResize: function(e) {
    const { innerWidth, innerHeight } = e.currentTarget;
    this.setState({
      window: { innerWidth, innerHeight }
    });
  },
  render: function() {
    return React.cloneElement(this.props.children, this.props);
  }
});

function mapStateToProps() {
  return { apis, window: {} };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { apis } = ownProps.route;
  return {
    dispatch,

    onFilter: () => {

    },
    onLanded: () => {

    },
    onPaging: () => {

    },
    onResize: () => {

    },
    onSubmit: (values) => {
      let query = {
        q: values.q ? values.q : ''
      };
      dispatch(fetchResults(query, apis));
      dispatch(updatePath(`/search?${stringify(query)}`));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
