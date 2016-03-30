require('./styles/index.scss');

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { findTemplate } from '../../templates';
import {
  invalidateQueryExpansions, fetchQueryExpansionsIfNeeded } from '../../actions/query_expansion';
import { fetchResults } from '../../actions/result';
import { invalidateSiblingFilters, invalidateAllFilters } from '../../actions/filter';
import { selectAPIs } from '../../actions/api';
import { updatePath } from '../../actions/path';
import { clearFiltering, updateQuery, replaceQuery } from '../../actions/query';

import BucketList from './bucket_list';
import Content from './content';
import Filter from './filter';
import Form from './form';
import Notification from '../components/notification';
import QueryExpansionList from './query_expansion_list';
import Result from './result';

var Search = React.createClass({
  displayName: 'Search',
  propTypes: {
    availableAPIs: PropTypes.object.isRequired,
    defaultAPIs: PropTypes.array.isRequired,
    filters: PropTypes.object,
    location: PropTypes.object,
    notifications: PropTypes.object,
    onBucket: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired,
    onPaging: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    query: PropTypes.object,
    queryExpansions: PropTypes.object,
    results: PropTypes.object,
    selectedAPIs: PropTypes.array.isRequired,
    window: PropTypes.object
  },
  componentDidMount: function() {
    const { location, params, onLoaded } = this.props;
    onLoaded({ apiName: params.api, query: location.query });
  },
  render: function() {
    const { defaultAPIs, filters, onBucket, onExpand, onFilter, onSelect, onSubmit, notifications, query, queryExpansions, results, selectedAPIs } = this.props;
    return (
      <div id="search" className="mi-search">

        <Notification notifications={ notifications } />

        <div className="mi-search__form-container">
          <Form onSubmit={ onSubmit } query={ query } />
          <div className="mi-search__query-expansion-list-container">
            <QueryExpansionList onClick={ onExpand } queryExpansions={ queryExpansions } />
          </div>
        </div>

        <div id="mi-bucket-list-container">
          <BucketList apis={ defaultAPIs } onClick={ onBucket } selectedAPIs={ selectedAPIs } />
        </div>

        <div className="mi-search__main-container">
          <Filter filters={ filters } onChange={ onFilter } query={ query } />
          <Content { ...this.props } />
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { filtersByAggregation, queryExpansions, resultsByAPI, selectedAPIs, window } = state;
  let results = {};
  for (let { uniqueId } of selectedAPIs) {
    results[uniqueId] = resultsByAPI[uniqueId] || {
      aggregations: {},
      invalidated: false,
      isFetching: true,
      items: [],
      metadata: {}
    };
  }
  return {
    filters : filtersByAggregation,
    findTemplate,
    queryExpansions,
    results,
    selectedAPIs,
    window
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { availableAPIs, defaultAPIs } = ownProps;
  return {
    onBucket: (apis, e) => {
      e.preventDefault();
      dispatch(selectAPIs(apis));
      dispatch(invalidateAllFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onClearFilter: (e) => {
      e.preventDefault();
      dispatch(clearFiltering(e.target.dataset.filters || []));
      dispatch(invalidateAllFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onExpand: (query, e) => {
      e.preventDefault();
      dispatch(invalidateAllFilters());
      dispatch(replaceQuery({ q: query }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onFilter: ({ name, values }) => {
      dispatch(updateQuery({ [name]: values }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onLoaded: ({ apiName, query }) => {
      let apis = availableAPIs[apiName] ? availableAPIs[apiName] : defaultAPIs;
      dispatch(replaceQuery(query));
      dispatch(selectAPIs(apis));

      dispatch(invalidateAllFilters());
      dispatch(invalidateQueryExpansions());

      dispatch(fetchResults());
      dispatch(fetchQueryExpansionsIfNeeded(query));
    },
    onPaging: (e) => {
      e.preventDefault();
      dispatch(updateQuery({ offset: e.target.dataset.offset }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onSelect: (api, e) => {
      e.preventDefault();
      dispatch(selectAPIs(api));
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
