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
  condensed: function(q, handleSubmit) {
    return (
      <form className="uk-grid uk-form mi-form mi-form-condensed">
        <div className="uk-width-1-1 uk-width-medium-3-12">
          <Header />
        </div>
        <div className="uk-width-1-1 uk-width-medium-4-12">
          { keywordInput(q, handleSubmit) }
        </div>
      </form>
    );
  },
  expanded: function(q, handleSubmit) {
    return (
      <div className="mi-form mi-form-expanded">
        <Header />

        <hr />

        <form className="uk-grid uk-grid-small uk-grid-divider" onSubmit={ handleSubmit }>
          <div className="uk-width-1-1">
            <p className="mi-text-muted">Search by Keyword</p>
            <div className="uk-width-1-1">
              { keywordInput(q, handleSubmit) }
            </div>
          </div>
        </form>
      </div>
    );
  },
  render: function() {
    const { fields: { q }, handleSubmit } = this.props;
    if (this.props.expanded) {
      return this.expanded(q, handleSubmit);
    } else {
      return this.condensed(q, handleSubmit);
    }
  }
});


export default reduxForm({
  form: 'form',
  fields: ['q']
}, state => ({
  initialValues: state.query
}))(Form);
