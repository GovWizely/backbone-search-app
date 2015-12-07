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
      <form className="pure-g mi-form mi-form-condensed">
        <div className="pure-u-3-12">
          <Header />
        </div>

        <div className="pure-u-4-12 mi-keyword">
          <div className="input-group">
            <input type="text" className="" ref="keyword" placeholder="Keyword" { ...q } />
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
      <div className="mi-form mi-form-expanded">

        <Header />

        <hr />

        <form className="pure-form pure-g" onSubmit={ handleSubmit }>
          <div className="pure-u-1 pure-u-md-2-3">
            <p className="mi-text-muted">Search by Keyword</p>
            <div className="mi-keyword pure-u-1">
              <input type="text" className="mi-keyword-input" placeholder="Keyword" { ...q }/>
              <span>
                <button className="pure-button mi-keyword-button" onClick={ handleSubmit }>
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-3 category-input">
            <p className="mi-text-muted">Search by Category</p>
            <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
            <p className="mi-text-muted separator">And / Or</p>
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
