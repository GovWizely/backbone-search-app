import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';
import Select from './aggregation-select';

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
  condensed: function(q, countries, industries, handleSubmit) {
    return (
      <form className="mi-row">
        <div className="col-md-3">
          <Header cssClass="condensed" />
        </div>

        <div className="col-md-4 keyword-input condensed">
          <div className="input-group">
            <input type="text" className="form-control" ref="keyword" placeholder="Keyword" { ...q } />
            <span className="input-group-btn">
              <button className="btn btn-success" onClick={ handleSubmit }>
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Industry" items={ this.props.aggregations.industries } onSubmit={ handleSubmit } { ...industries } />
        </div>

        <div className="col-md1">
          <button type="button" role="button" className="btn btn-primary" onClick={ handleSubmit }>Search</button>
        </div>
      </form>
    );
  },
  expanded: function(q, countries, industries, handleSubmit) {
    return (
      <div>
        <div className="mi-row page-header">
          <Header cssClass="text-center" />
        </div>

        <form className="mi-row" onSubmit={ handleSubmit }>
          <div className="col-md-8 keyword-input expanded">
            <p className="text-muted">Search by Keyword</p>
            <div className="input-group col-md-10">
              <input type="text" className="form-control input-lg" placeholder="Keyword" { ...q }/>
              <span className="input-group-btn">
                <button className="btn btn-success btn-lg" onClick={ handleSubmit }>
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-4 category-input">
            <p className="text-muted">Search by Category</p>
            <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
            <p className="text-muted separator">And / Or</p>
            <Select placeholder="Select Industry" items={ this.props.aggregations.industries } onSubmit={ handleSubmit } { ...industries } />

            <button type="button" role="button" className="btn btn-primary submit" onClick={ handleSubmit }>Search</button>
          </div>
        </form>
      </div>
    );
  },
  render: function() {
    const {
      fields: { q, countries, industries },
      handleSubmit
    } = this.props;
    if (this.props.expanded) {
      return this.expanded(q, countries, industries, handleSubmit);
    } else {
      return this.condensed(q, countries, industries, handleSubmit);
    }
  }
});


export default reduxForm({
  form: 'form',
  fields: ['q', 'countries', 'industries']
}, state => ({
  initialValues: state.query
}))(Form);
