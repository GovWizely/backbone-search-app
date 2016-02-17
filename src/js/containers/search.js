import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import apis from '../apis';
import { fetchResults } from '../actions/result';
import Deck from './deck';
import Filter from './filter';
import Result from './result';

import Form from '../components/form';
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
  for (let api in results) {
    let result = results[api];
    if (result.isFetching || (result.metadata && result.metadata.total > 0)) {
      return false;
    }
  }
  return true;
}

function showLoading(results, key=null) {
  if (key && results[key].isFetching) return true;
  if (key && !results[key].isFetching) return false;

  for (let api in results) {
    let result = results[api];
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
    // Prevent rapid fire filtering.
    const { results } = this.props;
    for (let key in results) {
      if (results[key].isFetching) return true;
    }
    return false;
  },
  fetch: function(props) {
    const { dispatch, location, params } = props;
    const api = apis[params.api] || _.filter(apis, api => api.deckable);
    dispatch(fetchResults(location.query, api));
  },
  handleFilter: function(filters) {
    const { dispatch, location, params } = this.props;
    let query = getFilterQuery(location.query, filters, this.props.filters);
    dispatch(updatePath(`${location.pathname}?${stringify(query)}`));
  },
  contentPane: function() {
    const { location, params, results } = this.props;

    let content = null;
    if (!params.api) {
      content = <Deck query={ location.query } apis={ apis} results={ results } />;
    } else {
      let api = apis[params.api],
          result = results[api.uniqueId],
          props = {
            query: location.query,
            api: apis[params.api],
            result: results[api.uniqueId],
            window
          };
      content = <Result {...props} />;
    }
    return <div id="mi-content-pane" key="content-pane">{ content }</div>;
  },
  leftPane: function() {
    const { filters, location, params } = this.props;
    let pane = null;
    if (filters.isFetching || !_.isEmpty(filters.items)) {
      pane = (
        <div id="mi-left-pane" key="left-pane">
          <Filter disabled={ this.disableFiltering() } filters={ filters } onChange={ this.handleFilter } query={ location.query } api={ apis[params.api] } />
        </div>
      );
    }
    return pane;
  },
  view: function() {
    const { filters, location, params, results, window } = this.props;
    if (params.api && !apis.hasOwnProperty(params.api)) {
      return <div>Invalid api type.</div>;
    }

    if (showLoading(results, params.api)) {
      let spinnerMargin = { marginTop: 100 };
      return <div style={ spinnerMargin }><Spinner message="Searching..." /></div>;
    }

    if (noMatch(results)) {
      return <div>Your search did not match any documents.</div>;
    }

    return [
      this.leftPane(),
      this.contentPane()
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
        <div id="mi-main-pane">
          { this.view() }
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { filters, notifications, query, results } = state;

  return {
    filters,
    notifications,
    query,
    results
  };
}

export default connect(mapStateToProps)(Search);
