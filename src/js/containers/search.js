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
import Cards from './cards';
import Result from './result';

import Form from '../components/form';
import CheckboxTree from '../components/checkbox-tree';
import Message from '../components/search-message';
import Pagination from '../components/pagination';

function shouldFetch(location, nextLocation) {
  return (location.pathname !== nextLocation.pathname ||
          location.search !== nextLocation.search);
}

var Search = React.createClass({
  displayName: 'Search',
  propTypes: {
    aggregations: PropTypes.object,
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
      [filters.id]: filters.items
    });
    dispatch(updatePath(`/search/articles?${stringify(query)}`));
  },
  view: function() {
    const { location, params, results } = this.props;
    let resource = null;
    switch(params.resource) {
    default:
      resource = resources.articles;
      return [
        // Article Results
        <Result key="article"
          result={ results.article } resource={ resource }
          query={ location.query } screen="search" />,

        // TradeLead Results
        <Result key="tradeLead"
          result={ results.tradeLead } resource={ resources.trade_leads }
          query={ location.query } screen="search" />,

        // TradeEvent Results
        <Result key="tradeEvent"
          result={ results.tradeEvent } resource={ resources.trade_events }
          query={ location.query } screen="search" />
      ];
    }
    return null;
  },
  render: function() {
    const { aggregations, filters, location, onSubmit, params, results } = this.props;
    return (
      <div id="search">
        <Form
          aggregations={ aggregations }
          expanded={ false }
          query={ location.query }
          onSubmit={ onSubmit } />
        <div id="main-pane">
          <div id="left-pane">
            <Filter filters={ filters } onChange={ this.handleFilter } />
          </div>
          <div id="content-pane">
            { this.view() }
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { aggregations, filters, results } = state;

  return {
    aggregations,
    filters,
    results
  };
}

export default connect(mapStateToProps)(Search);
