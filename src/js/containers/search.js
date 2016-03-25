require('./search/styles/index.scss');

import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  invalidateQueryExpansions, fetchQueryExpansionsIfNeeded } from '../actions/query_expansion';
import { fetchResults } from '../actions/result';
import { invalidateFilters } from '../actions/filter';
import { selectAPIs } from '../actions/api';
import { updatePath } from '../actions/path';
import { updateQuery, replaceQuery } from '../actions/query';

import Deck from './deck';
import Filter from './filter';
import Result from './result';
import BucketList from './search/bucket_list';
import QueryExpansionList from './search/query_expansion_list';

import Form from '../components/form';
import Notification from '../components/notification';
import Spinner from '../components/spinner';

export function showDeck(options) {
  return options.apis.length > 1 &&
    _.filter(options.results, (results) => {
      return !results.isFetching && results.items.length > 0;
    }).length > 1;
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
function showLoading(filters, key=null) {
  if (filters.isFetching) return true;
  return false;
}

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
  contentPane: function() {
    const { onPaging, onSelect, params, query, results, selectedAPIs } = this.props;
    let content = null;
    if (showDeck({ apis: selectedAPIs, results })) {
      let props = {
        apis: selectedAPIs,
        onClick: onSelect,
        results
      };
      content = <Deck {...props} />;
    } else {
      let props = {
        api: selectedAPIs[0],
        onPaging,
        query,
        result: results[selectedAPIs[0].uniqueId],
        window
      };
      content = <Result {...props} />;
    }
    return <div id="mi-content-pane" key="content-pane">{ content }</div>;
  },
  leftPane: function() {
    const { filters, onFilter, params, query } = this.props;
    let pane = null;
    if (filters.isFetching || !_.isEmpty(filters.items)) {
      pane = (
        <div id="mi-left-pane" key="left-pane">
          <Filter filters={ filters } onChange={ onFilter } query={ query } />
        </div>
      );
    }
    return pane;
  },
  view: function() {
    const { availableAPIs, filters, params, results, window } = this.props;
    if (params.api && !availableAPIs.hasOwnProperty(params.api)) {
      return <div>Invalid api type.</div>;
    }

    if (showLoading(filters, params.api)) {
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
    const { availableAPIs, defaultAPIs, onBucket, onExpand, onSubmit, notifications, params, query, queryExpansions, results, selectedAPIs } = this.props;
    return (
      <div id="search" className="mi-search">
        <Notification notifications={ notifications } />
        <div className="mi-search__form-container">
          <Form
             expanded={ false }
             onSubmit={ onSubmit }
             query={ query } />
          <div id="mi-query-expansion-list-container">
            <QueryExpansionList onClick={ onExpand } queryExpansions={ queryExpansions } />
          </div>
        </div>
        <div id="mi-bucket-list-container">
          <BucketList apis={ defaultAPIs } onClick={ onBucket } selectedAPIs={ selectedAPIs } />
        </div>
        <div id="mi-main-pane">
          { this.view() }
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { filters, queryExpansions, resultsByAPI, selectedAPIs } = state;
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
    filters,
    queryExpansions,
    results,
    selectedAPIs
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { availableAPIs, defaultAPIs } = ownProps;
  return {
    onBucket: (apis, e) => {
      e.preventDefault();
      dispatch(selectAPIs(apis));
      dispatch(invalidateFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onExpand: (query, e) => {
      e.preventDefault();
      dispatch(replaceQuery({ q: query }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onFilter: (filter) => {
      dispatch(updateQuery({ [filter.name]: filter.items, offset: 0 }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onLoaded: ({ apiName, query }) => {
      let apis = availableAPIs[apiName] ? availableAPIs[apiName] : defaultAPIs;
      dispatch(replaceQuery(query));
      dispatch(selectAPIs(apis));

      dispatch(invalidateFilters());
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
