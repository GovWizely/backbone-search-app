import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { stringify } from 'querystring';

import Form from '../components/form';
import TabPane from '../components/tab-pane';
import Message from '../components/search-message';
import Pagination from '../components/pagination';

import Result from '../containers/result';
import resources from '../resources';

function shouldFetch(location, nextLocation) {
  return (location.pathname !== nextLocation.pathname ||
          location.search !== nextLocation.search);
}

var AdhocReport = React.createClass({
  displayName: 'AdhocReport',
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
    const { dispatch, location, params } = props;
    dispatch(resources[params.resource].fetch(location.query));
  },
  render: function() {
    const { aggregations, dispatch, location, onSubmit, params, results } = this.props;
    const resource = resources[params.resource];
    const querystring = stringify(location.query);
    const tabs = [
      {
        title: 'Latest Market Intelligence',
        url: `#/adhoc_report/articles?${querystring}`,
        active: '/adhoc_report/articles' === location.pathname
      },
      {
        title: 'Trade Events',
        url: `#/adhoc_report/trade_events?${querystring}`,
        active: '/adhoc_report/trade_events' === location.pathname
      },
      {
        title: 'Trade Leads',
        url: `#/adhoc_report/trade_leads?${querystring}`,
        active: '/adhoc_report/trade_leads' === location.pathname
      }
    ];
    const content = <Result screen="adhoc_report" result={ results[resource.stateKey] } resource={ resource } query={ location.query } />;
    return (
      <div>
        <div className="mi-row searchbar">
          <Form
            aggregations={ aggregations }
            expanded={ false }
            query={ location.query }
            onSubmit={ onSubmit } />
        </div>
        <TabPane tabs={ tabs } content={ content }/>
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

export default connect(mapStateToProps)(AdhocReport);
