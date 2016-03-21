import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchResults } from '../actions/result';
import { invalidateFilters } from '../actions/filter';
import { selectAPIs } from '../actions/api';
import { updatePath } from '../actions/path';
import { updateQuery, replaceQuery } from '../actions/query';

import Deck from './deck';
import Filter from './filter';
import Result from './result';
import BucketList from './search/bucket-list';

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
    notifications: PropTypes.object,
    onBucket: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onPaging: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    query: PropTypes.object,
    results: PropTypes.object,
    selectedAPIs: PropTypes.array.isRequired,
    window: PropTypes.object
  },
  contentPane: function() {
    const { onPaging, onExpand, params, query, results, selectedAPIs } = this.props;
    let content = null;
    if (showDeck({ apis: selectedAPIs, results })) {
      let props = {
        apis: selectedAPIs,
        onExpand,
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
    const { availableAPIs, defaultAPIs, onBucket, onSubmit, notifications, params, query, results, selectedAPIs } = this.props;
    return (
      <div id="search">
        <Notification notifications={ notifications } />
        <Form
           expanded={ false }
           query={ query }
           onSubmit={ onSubmit } />
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
  const { filters, resultsByAPI, selectedAPIs } = state;
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
    results,
    selectedAPIs
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBucket: (apis, e) => {
      e.preventDefault();
      dispatch(selectAPIs(apis));
      dispatch(invalidateFilters());
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onExpand: (api, e) => {
      e.preventDefault();
      dispatch(selectAPIs(api));
      dispatch(updatePath());
    },
    onFilter: (filter) => {
      dispatch(updateQuery({ [filter.name]: filter.items, offset: 0 }));
      dispatch(fetchResults());
      dispatch(updatePath());
    },
    onPaging: (e) => {
      e.preventDefault();
      dispatch(updateQuery({ offset: e.target.dataset.offset }));
      dispatch(fetchResults());
      dispatch(updatePath());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
