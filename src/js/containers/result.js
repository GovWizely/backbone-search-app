import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import { page } from '../config';
import Form from '../components/form';
import Filter from './filter';
import CheckboxTree from '../components/checkbox-tree';
import Cards from './cards';
import ResultList from '../components/result-list';
import Messages from '../components/search-message';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';
import ViewHelper from '../utils/view-helper';
import resources from '../resources';

const Result = React.createClass({
  displayName: 'Result',
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
    switch(params.resource) {
    case undefined:
      for (let key in resources) {
        dispatch(resources[key].fetch(query));
      }
      break;
    default:
      if (resources[params.resource]) {
        dispatch(resources[params.resource].fetch(query));
      }
    }
  },
  handleFilter: function(filters) {
    const { dispatch, location } = this.props;
    let query = assign({}, location.query, {
      [filters.id]: filters.items
    });
    dispatch(updatePath(`/search/articles?${stringify(query)}`));
  },
  results: function(result, fields, pathname) {
    if (result.isFetching) return <Spinner key="spinner" />;
    return (
      <div key="result">
        <Messages
           keyword={ this.props.location.query.q }
           total={ result.metadata.total }
        />
        <ResultList items={ result.items } fields={ fields }/>
        <Pagination
          metadata={ result.metadata }
          pathname={ `#/search/${pathname}` }
          query={ this.props.location.query }
          options={ page } />
      </div>
    );
  },
  view: function() {
    const { location, params, results } = this.props;
    let resource = null;
    switch(params.resource) {
    case undefined:
      resource = resources.articles;
      return [
        this.results(results.article, resource.fields, resource.pathname),
        <Cards results={ results } query={ location.query } key="cards" />
      ];
    default:
      resource = resources[params.resource];
      if (results[resource.stateKey]) {
        return this.results(results[resource.stateKey], resource.fields, resource.pathname);
      }
    }
    return null;
  },
  render: function() {
    const { aggregations, location: { query }, onSubmit, params, results } = this.props;
    let filter = null,
        filterComponent = null;
    if (_.isUndefined(params.resource)) {
      filter = results.article.aggregations;
    } else {
      filter = results[resources[params.resource].stateKey].aggregations;
    }
    if (filter) {
      filterComponent = <Filter aggregations={ filter } onChange={ this.handleFilter } />;
    }
    return (
      <div>
        <div className="searchbar row">
          <Form
            expanded={ false }
            aggregations={ aggregations }
            onSubmit={ onSubmit } />
        </div>
        <div className="row">
          <div className="col-md-3">{ filterComponent }</div>
          <div className="col-md-9">{ this.view() }</div>
        </div>
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

export default connect(mapStateToProps)(Result);
