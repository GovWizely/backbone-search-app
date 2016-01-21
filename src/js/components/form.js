import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';

function keywordInput(q, handleSubmit) {
  return (
    <div className="mi-keyword">
      <input type="text" placeholder="Keyword" { ...q } />
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
      <div className="mi-form mi-form-condensed">
        <div>
          <Header />
        </div>
        <form onSubmit={ handleSubmit }>
          { keywordInput(q, handleSubmit) }
        </form>
      </div>
    );
  },
  expanded: function(q, handleSubmit) {
    return (
      <div className="mi-form mi-form-expanded">
        <div>
          <Header />
        </div>

        <form onSubmit={ handleSubmit }>
          { keywordInput(q, handleSubmit) }
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
