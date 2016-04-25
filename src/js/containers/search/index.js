import assign from 'object-assign';
import { reduce } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { findTemplate } from '../../templates';
import {
  invalidateQueryExpansions, fetchQueryExpansionsIfNeeded } from '../../actions/query_expansion';
import { fetchResults } from '../../actions/result';
import { invalidateAllFilters } from '../../actions/filter';
import { selectAPIs } from '../../actions/api';
import { updatePath } from '../../actions/path';
import { clearFiltering, updateFiltering, updateQuery, replaceQuery } from '../../actions/query';

import Notification from '../../components/notification';

import BucketList from './bucket_list';
import Content from './content';
import Filter from './filter';
import Form from './form';
import QueryExpansionList from './query_expansion_list';

class Index extends React.Component {
  componentDidMount() {
    const { location, params, onLoaded } = this.props;
    onLoaded({ apiName: params.api, query: location.query });
  }
  render() {
    const {
      defaultAPIs, filters,
      onBucket, onClearFilter, onExpand, onFilter, onPaging, onSelect, onSubmit,
      notifications, query, queryExpansions, results, selectedAPIs
    } = this.props;
    return (
      <div id="search" className="mi-search">

        <Notification notifications={notifications} />

        <div className="mi-search__form-container">
          <Form onSubmit={onSubmit} query={query} />
          <div className="mi-search__query-expansion-list-container">
            <QueryExpansionList onClick={onExpand} queryExpansions={queryExpansions} />
          </div>
        </div>

        <div className="mi-search__bucket-list-container">
          <BucketList apis={defaultAPIs} onClick={onBucket} selectedAPIs={selectedAPIs} />
        </div>

        <div className="mi-search__main-container">
          <Filter
            filters={filters}
            onChange={onFilter} onClear={onClearFilter}
            query={query}
          />
          <div className="mi-search__content-container">
            <Content
              findTemplate={findTemplate}
              onPaging={onPaging} onSelect={onSelect}
              query={query} results={results} selectedAPIs={selectedAPIs}
              window={window}
            />
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  defaultAPIs: PropTypes.array.isRequired,
  enabledAPIs: PropTypes.object.isRequired,
  filters: PropTypes.object,
  location: PropTypes.object,
  notifications: PropTypes.object,
  onBucket: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
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
};

function mapStateToProps(state) {
  const { filtersByAggregation, queryExpansions, resultsByAPI, selectedAPIs, window } = state;

  const results = reduce(
    selectedAPIs, (output, { uniqueId }) =>
      assign(output, {
        [uniqueId]: resultsByAPI[uniqueId] || {
          aggregations: {}, items: [], metadata: {}, invalidated: false, isFetching: true
        }
      }), {});

  return {
    filters: filtersByAggregation,
    findTemplate,
    queryExpansions,
    results,
    selectedAPIs,
    window
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { defaultAPIs, enabledAPIs } = ownProps;
  return {
    onBucket: (apis) => {
      dispatch(selectAPIs(apis));
      dispatch(updateQuery({ offset: 0 }));
      dispatch(invalidateAllFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onClearFilter: (e) => {
      e.preventDefault();
      dispatch(clearFiltering(e.target.dataset.filters));
      dispatch(invalidateAllFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onExpand: (query) => {
      dispatch(invalidateAllFilters());
      dispatch(replaceQuery({ q: query }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onFilter: ({ name, values }) => {
      dispatch(updateFiltering(name, values));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onLoaded: ({ apiName, query }) => {
      const apis = enabledAPIs[apiName] ? enabledAPIs[apiName] : defaultAPIs;
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
)(Index);
