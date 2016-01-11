import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';
import Select from './aggregation-select';

function keywordInput(q, handleSubmit) {
  return (
    <div className="uk-width-1-1 mi-keyword">
      <input type="text" className="uk-width-1-1" placeholder="Keyword" { ...q } />
      <span>
        <button className="uk-button uk-button-success" onClick={ handleSubmit }>
          <i className="mi-icon mi-icon-search"></i>
        </button>
      </span>
    </div>
  );
}

var Form =  React.createClass({
  displayName: 'ExpandedForm',
  propTypes: {
    aggregations: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      expanded: true
    };
  },
  condensed: function(aggregations, q, countries, industries, handleSubmit) {
    const { isLoading,  data: {
      countries: countryItems,
      industries: industryItems
    } } = aggregations;
    return (
      <form className="uk-grid uk-form mi-form mi-form-condensed">
        <div className="uk-width-1-1 uk-width-medium-3-12">
          <Header />
        </div>

        <div className="uk-width-1-1 uk-width-medium-4-12">
          { keywordInput(q, handleSubmit) }
        </div>

        <div className="uk-width-medium-2-12">
        <Select placeholder="Select Country" isLoading={ isLoading } items={ countryItems } onSubmit={ handleSubmit } { ...countries } />
        </div>

        <div className="uk-width-medium-2-12">
        <Select placeholder="Select Industry" isLoading={ isLoading }items={ industryItems } onSubmit={ handleSubmit } { ...industries } />
        </div>

        <div className="uk-width-medium-1-12">
          <button type="button" role="button" className="uk-button uk-button-primary" onClick={ handleSubmit }>Search</button>
        </div>
      </form>
    );
  },
  expanded: function(aggregations, q, countries, industries, handleSubmit) {
    const { isLoading,  data: {
      countries: countryItems,
      industries: industryItems
    } } = aggregations;
    return (
      <div className="mi-form mi-form-expanded">
        <Header />

        <hr />

        <form className="uk-grid uk-grid-small uk-grid-divider" onSubmit={ handleSubmit }>
          <div className="uk-width-1-1 uk-width-medium-2-3">
            <p className="mi-text-muted">Search by Keyword</p>
            <div className="uk-width-1-1">
              { keywordInput(q, handleSubmit) }
            </div>
          </div>
          <div className="uk-width-1-1 uk-width-medium-1-3 category-input">
            <p className="mi-text-muted">Search by Category</p>
            <Select placeholder="Select Country" isLoading={ isLoading } items={ countryItems } onSubmit={ handleSubmit } { ...countries } />

            <p className="mi-text-muted separator">And / Or</p>
            <Select placeholder="Select Industry" isLoading={ isLoading }items={ industryItems } onSubmit={ handleSubmit } { ...industries } />

            <button type="button" role="button" className="uk-button uk-button-primary submit" onClick={ handleSubmit }>Search</button>
          </div>
        </form>
      </div>
    );
  },
  render: function() {
    const {
      fields: { q, countries, industries },
      handleSubmit,
      aggregations
    } = this.props;
    if (this.props.expanded) {
      return this.expanded(aggregations, q, countries, industries, handleSubmit);
    } else {
      return this.condensed(aggregations, q, countries, industries, handleSubmit);
    }
  }
});


export default reduxForm({
  form: 'form',
  fields: ['q', 'countries', 'industries']
}, state => ({
  initialValues: state.query
}))(Form);
