import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import resources from '../resources';
import { fetchResults } from '../actions/result';
import Deck from './deck';
import Filter from './filter';
import Result from './result';

import Form from '../components/form';
import CheckboxTree from '../components/checkbox-tree';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';

function getFilterQuery(query, filter, filterState) {
  let filterQuery = assign({}, query, {
    [filter.name]: filter.items,
    offset: 0
  });
  if (_.isEmpty(filter.items)) delete filterQuery[filter.name];

  delete filterQuery.filter;
  for (let key in filterState.items) {
    if (filterQuery[key] && !_.isEmpty(filterQuery[key])) filterQuery.filter = true;
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

function showLoading(results, key=null) {
  if (key && results[key].isFetching) return true;
  if (key && !results[key].isFetching) return false;

  for (let resource in results) {
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
    results: PropTypes.object,
    window: PropTypes.object
  },
  componentDidMount: function() {
    this.fetch(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    if (shouldFetch(this.props.location, nextProps.location)) {
      this.fetch(nextProps);
    }
  },
  disableFiltering: function() {
    const { results } = this.props;
    for (let key in results) {
      if (results[key].isFetching) return true;
    }
    return false;
  },
  fetch: function(props) {
    const { dispatch, location, params } = props;
    const resource = resources[params.resource] || _.map(resources, resource => resource);
    dispatch(fetchResults(location.query, resource));
  },
  handleFilter: function(filters) {
    const { dispatch, location, params } = this.props;
    let query = getFilterQuery(location.query, filters, this.props.filters);
    dispatch(updatePath(`${location.pathname}?${stringify(query)}`));
  },
  screen: function() {
    const resourceType = this.props.params.resource;
  },
  view: function() {
    const { location, params, results, window } = this.props;
    if (params.resource && !resources.hasOwnProperty(params.resource)) {
      return <div>Invalid resource type.</div>;
    }

    if (noMatch(results)) {
      return <div>Your search did not match any documents.</div>;
    }

    if (showLoading(results, params.resource)) {
      return <Spinner message="Searching..." />;
    }

    let content = null;
    if (!params.resource) {
      content = <Deck query={ location.query } resources={ resources} results={ results } />;
    } else {
      let resource = resources[params.resource],
          result = results[resource.stateKey],
          props = {
            query: location.query,
            resource: resources[params.resource],
            result: results[resource.stateKey],
            window
          };
      content = <Result {...props} />;
    }

    return [
      <div id="left-pane" key="left-pane">
        <Filter disabled={ this.disableFiltering() } filters={ this.props.filters } onChange={ this.handleFilter } query={ location.query } resource={ resources[params.resource] } />
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
