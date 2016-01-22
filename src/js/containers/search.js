import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import { resources } from '../config';
import { fetchConsolidatedResults } from '../actions/consolidatedResult';
import Filter from './filter';
import Result from './result';

import Form from '../components/form';
import CheckboxTree from '../components/checkbox-tree';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';

function getFilterQuery(query, filters) {
  let filterQuery = assign({}, query, {
    [filters.name]: filters.items,
    offset: 0
  });
  delete filterQuery.filter;
  for (let filter of ['countries', 'industries', 'topics']) {
    if (filterQuery[filter] && !_.isEmpty(filterQuery[filter])) filterQuery.filter = true;
  };
  return filterQuery;
}

function shouldFetch(location, nextLocation) {
  return (location.pathname !== nextLocation.pathname ||
          location.search !== nextLocation.search);
}

function noMatch(results) {
  for (let resource in results) {
    let result = results[resource];
    if (result.isFetching || (result.metadata && result.metadata.total > 0)) {
      return false;
    }
  }
  return true;
}

function showLoading(results) {
  for (let resource in  results) {
    let result = results[resource];
    if (!result.isFetching) {
      return false;
    }
  }
  return true;
}

var Search = React.createClass({
  displayName: 'Search',
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object,
    location: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    params: PropTypes.object.isRequired,
    query: PropTypes.object,
    results: PropTypes.object
  },
  componentDidMount: function() {
    this.fetch(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    if (shouldFetch(this.props.location, nextProps.location)) {
      this.fetch(nextProps);
    }
  },
  fetch: function(props) {
    const { dispatch, location } = props;

    dispatch(fetchConsolidatedResults(location.query));
  },
  handleFilter: function(filters) {
    const { dispatch, location } = this.props;
    let query = getFilterQuery(location.query, filters);
    dispatch(updatePath(`/search?${stringify(query)}`));
  },
  view: function() {
    const { location, params, results } = this.props;

    if (!resources.hasOwnProperty(params.resource)) {
      return <div>Invalid resource type.</div>;
    }

    if (noMatch(results)) {
      return <div>Your search did not match any documents.</div>;
    }

    if (showLoading(results)) {
      return <Spinner message="Searching..." />;
    }

    const resource = resources[params.resource],
          result = results[resource.stateKey],
          props = {
            query: location.query,
            resource,
            result,
            screen: `search/${resource.pathname}`
          },
          content = <Result {...props} />;

    return [
      <div id="left-pane" key="left-pane">
        <Filter filters={ this.props.filters } onChange={ this.handleFilter } query={ location.query }/>
      </div>,
      <div id="content-pane" key="content-pane">
        { content }
      </div>
    ];
  },
  render: function() {
    const { location, onSubmit, params, results } = this.props;
    return (
      <div id="search">
        <Form
          expanded={ false }
          query={ location.query }
          onSubmit={ onSubmit } />
        <div id="main-pane">
          { this.view() }
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { filters, query, results } = state;

  return {
    filters,
    query,
    results
  };
}

export default connect(mapStateToProps)(Search);
