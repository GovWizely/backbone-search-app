import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { fetchAggregations, fetchArticles } from '../actions';
import Form from '../components/expanded-form';

var App = React.createClass({
  displayName: 'App',

  componentDidMount: function() {
    this.props.dispatch(fetchAggregations());
  },
  handleSubmit: function(query) {
    this.props.dispatch(updatePath('/search'));
  },
  handleFilter: function(filters) {

  },
  render: function() {
    const { keyword, countries, industries } = this.props.query;
    var props = {
      keyword,
      countries,
      industries,
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

App.propTypes = {
  aggregations: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { query, aggregations } = state;

  return {
    aggregations,
    query
  };
}

export default connect(mapStateToProps)(App);
