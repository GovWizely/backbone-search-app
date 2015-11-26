import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';

import Form from '../components/form';
import Result from '../containers/result';
import Message from '../components/search-message';
import Pagination from '../components/pagination';
import resources from '../resources';

var AdhocReport = React.createClass({
  displayName: 'AdhocReport',
  propTypes: {
    aggregations: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    params: PropTypes.object.isRequired,
    results: PropTypes.object
  },
  componentDidMount: function() {
    this.fetch(this.props.location.query);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.fetch(nextProps.location.query);
    }
  },
  fetch: function(query) {
    const { dispatch, params } = this.props;
    dispatch(resources[params.resource].fetch(query));
  },
  render: function() {
    const { aggregations, location, onSubmit, params, results } = this.props;
    const resource = resources[params.resource];
    return (
      <div>
        <div className="search bar row">
          <Form
            aggregations={ aggregations }
            expanded={ false }
            querey={ location.query }
            onSubmit={ onSubmit } />
        </div>
        <Result screen="adhoc-report" result={ results[resource.stateKey] } resource={ resource } query={ location.query } />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { results } = state;

  return {
    results
  };
}

export default connect(mapStateToProps)(AdhocReport);
