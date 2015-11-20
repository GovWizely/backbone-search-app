import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

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

import {
  fetchArticles, fetchTradeEvents, fetchTradeLeads
} from '../actions';

const Result = React.createClass({
  displayName: 'Result',
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
  results: function(result, fields) {
    if (result.isFetching) return <Spinner />;
    return (
      <div>
        <Messages
           keyword={ this.props.location.query.q }
           total={ result.metadata.total }
        />
        <ResultList items={ result.items } fields={ fields }/>
        <Pagination metadata={ result.metadata } location={ this.props.location } />
      </div>
    );
  },
  view: function() {
    const { location, params, results } = this.props;
    switch(params.resource) {
    case undefined:
      return [
        <Cards results={ results } query={ location.query } />,
        this.results(this.props.results.article, resources.articles.fields)
      ];
    default:
      let stateKey = resources[params.resource].stateKey;
      if (results[stateKey]) {
        return this.results(results[stateKey], resources[params.resource].fields);
      }
    }
    return null;
  },
  render: function() {
    const { aggregations, location: { query }, onSubmit, params, results } = this.props;
    var filter;
    if (_.isUndefined(params.resource)) {
      filter = results.article.aggregations;
    } else {
      filter = results[resources[params.resource].stateKey].aggregations;
    }
    return (
      <div>
        <div className="searchbar row">
          <Form
            expanded={ false }
            aggregations={ aggregations }
            onSubmit={ onSubmit }
            query={ query }/>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Filter aggregations={ filter } onChange={ this.handleFilter } />
          </div>
          <div className="col-md-9">
            { this.view() }
          </div>
        </div>
      </div>
    );
  }
});

Result.propTypes = {
  aggregations: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  params: PropTypes.object.isRequired,
  results: PropTypes.object
};

function mapStateToProps(state) {
  const { results } = state;

  return {
    results
  };
}

export default connect(mapStateToProps)(Result);
