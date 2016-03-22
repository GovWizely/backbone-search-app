require('./styles/form.scss');

import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';

var Form = ({ expanded, fields, focused, handleSubmit, onSubmit }) => {
  const css = expanded ? 'mi-form mi-form-expanded' : 'mi-form mi-form-condensed';
  return (
    <div className={ css }>
      <div className="mi-header-container">
        <Header />
      </div>

      <form onSubmit={ handleSubmit }>
        <input id="mi-input" autoFocus={ focused } type="text" placeholder="Keyword" { ...fields.q } aria-label="Enter keyword" />
        <span id="mi-submit">
          <button className="uk-button" onClick={ handleSubmit } title="Search">
            <i className="mi-icon mi-icon-search" aria-label="Search"></i>
          </button>
        </span>
      </form>
    </div>
  );
};

Form.propTypes = {
  expanded: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  focused: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

Form.defaultProps = {
  expanded: true,
  focused: false
};

exports.Form;

export default reduxForm({
  form: 'form',
  fields: ['q']
}, state => ({
  initialValues: state.query
}))(Form);
