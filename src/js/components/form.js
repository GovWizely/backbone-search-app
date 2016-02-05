import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';

export const Form =  React.createClass({
  displayName: 'Form',
  propTypes: {
    expanded: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    focused: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      expanded: true,
      focused: false
    };
  },
  render: function() {
    const { expanded, fields: { q }, focused, handleSubmit } = this.props;
    const css = expanded ? 'mi-form mi-form-expanded' : 'mi-form mi-form-condensed';
    return (
      <div className={ css }>
        <div>
          <Header />
        </div>

        <form onSubmit={ handleSubmit }>
          <div className="mi-keyword">
            <input autoFocus={ focused } type="text" placeholder="Keyword" { ...q } aria-label="Enter keyword" />
            <span>
              <button className="uk-button uk-button-success" onClick={ handleSubmit }>
                <i className="mi-icon mi-icon-search" aria-label="Search"></i>
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});

export default reduxForm({
  form: 'form',
  fields: ['q']
}, state => ({
  initialValues: state.query
}))(Form);
