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
      <form className="pure-g">
        <div className="pure-u-3-12">
          <Header cssClass="condensed" />
        </div>

        <div className="pure-u-4-12 keyword-input condensed">
          <div className="input-group">
            <input type="text" className="form-control" ref="keyword" placeholder="Keyword" { ...q } />
            <span className="input-group-btn">
              <button className="btn btn-success" onClick={ handleSubmit }>
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>

        <div className="pure-u-2-12">
        <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
        </div>

        <div className="pure-u-2-12">
        <Select placeholder="Select Industry" items={ this.props.aggregations.industries } onSubmit={ handleSubmit } { ...industries } />
        </div>

        <div className="pure-u-1-12">
          <button type="button" role="button" className="btn btn-primary" onClick={ handleSubmit }>Search</button>
        </div>
      </form>
    );
  },
  expanded: function(q, countries, industries, handleSubmit) {
    return (
      <div>
        <div className="">
          <Header cssClass="mi-text-center" />
        </div>

        <form className="pure-g" onSubmit={ handleSubmit }>
          <div className="pure-u-2-3 keyword-input expanded">
            <p className="text-muted">Search by Keyword</p>
            <div className="pure-u-10-12">
              <input type="text" className="" placeholder="Keyword" { ...q }/>
              <span className="">
                <button className="pure-button mi-button-success mi-button-large" onClick={ handleSubmit }>
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="pure-u-1-3 category-input">
            <p className="text-muted">Search by Category</p>
            <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
            <p className="text-muted separator">And / Or</p>
            <Select placeholder="Select Industry" items={ this.props.aggregations.industries } onSubmit={ handleSubmit } { ...industries } />

            <button type="button" role="button" className="pure-button pure-button-primary submit" onClick={ handleSubmit }>Search</button>
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
