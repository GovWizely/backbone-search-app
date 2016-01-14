import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import { page } from '../config';
import { fetchConsolidatedResults } from '../actions/consolidatedResult';
import resources from '../resources';
import Filter from './filter';
import Result from './result';

import Form from '../components/form';
import CheckboxTree from '../components/checkbox-tree';
import Message from '../components/search-message';
import Pagination from '../components/pagination';

function shouldFetch(location, nextLocation) {
  return (location.pathname !== nextLocation.pathname ||
          location.search !== nextLocation.search);
}

function noMatch(results) {
  for (let resource in results) {
    let result = results[resource];
    if (result.metadata && result.metadata.total > 0) {
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
    const { dispatch, params, location } = props;
    dispatch(fetchConsolidatedResults(location.query));
  },
  handleFilter: function(filters) {
    const { dispatch, location } = this.props;
    let query = assign({}, location.query, {
      [filters.name]: filters.items,
      filter: true
    });
    dispatch(updatePath(`/search?${stringify(query)}`));
  },
  view: function() {
    const { location, results } = this.props;
    if (noMatch(results)) {
      return <div>Your search did not match any documents.</div>;
    }
    const resultsView = [
      // Article Results
      <Result key="article"
        result={ results.article } resource={ resources.articles }
        query={ location.query } screen="search" />,

      // TradeEvent Results
      <Result key="tradeEvent"
        result={ results.tradeEvent } resource={ resources.trade_events }
        query={ location.query } screen="search" />,

      // TradeLead Results
      <Result key="tradeLead"
        result={ results.tradeLead } resource={ resources.trade_leads }
        query={ location.query } screen="search" />
    ];

    return [
      <div id="left-pane" key="left-pane">
        <Filter filters={ this.props.filters } onChange={ this.handleFilter } />
      </div>,
      <div id="content-pane" key="content-pane">
        { resultsView }
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
  const { filters, results } = state;

  return {
    filters,
    results
  };
}

export default connect(mapStateToProps)(Search);
