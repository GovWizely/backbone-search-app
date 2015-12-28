import _ from 'lodash';
import assign from 'object-assign';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { stringify } from 'querystring';
import { updatePath } from 'redux-simple-router';

import { page } from '../config';
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
    switch(params.resource) {
    case undefined:
      for (let key in resources) {
        dispatch(resources[key].fetch(location.query));
      }
      break;
    default:
      if (resources[params.resource]) {
        dispatch(resources[params.resource].fetch(location.query));
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
  view: function() {
    const { location, params, results } = this.props;
    let resource = null;
    switch(params.resource) {
    case undefined:
      resource = resources.articles;
      return [
        <Result
          result={ results.article } resource={ resource }
          query={ location.query } screen="search" key="result" />,
        <Cards results={ results } query={ location.query } key="cards" />
      ];
    default:
      resource = resources[params.resource];
      if (results[resource.stateKey]) {
        return (
          <Result
            result={ results[resource.stateKey] } resource={ resource }
            query={ location.query } screen="search" key="result" />
        );
      }
    }
    return null;
  },
  render: function() {
    const { aggregations, location, onSubmit, params, results } = this.props;
    var filter;
    if (_.isUndefined(params.resource)) {
      filter = results.article.aggregations;
    } else {
      filter = results[resources[params.resource].stateKey].aggregations;
    }
    return (
      <div id="search">
        <div className="uk-grid">
          <div className="uk-width-1-1 searchbar">
            <Form
              aggregations={ aggregations }
              expanded={ false }
              query={ location.query }
              onSubmit={ onSubmit } />
          </div>
        </div>
        <div className="uk-grid">
          <div className="uk-width-1-4">
            <Filter aggregations={ filter } onChange={ this.handleFilter } />
          </div>
          <div className="uk-width-3-4">
            { this.view() }
          </div>
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

export default connect(mapStateToProps)(Search);
