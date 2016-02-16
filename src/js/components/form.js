import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';

var Form = ({ expanded, fields, focused, handleSubmit, onSubmit }) => {
  const css = expanded ? 'mi-form mi-form-expanded' : 'mi-form mi-form-condensed';
  return (
    <div className={ css }>
      <div>
        <Header />
      </div>

      <form onSubmit={ handleSubmit }>
        <div className="mi-keyword">
          <input autoFocus={ focused } type="text" placeholder="Keyword" { ...fields.q } aria-label="Enter keyword" />
          <span>
            <button className="uk-button uk-button-success" onClick={ handleSubmit } title="Search">
              <i className="mi-icon mi-icon-search" aria-label="Search"></i>
            </button>
          </span>
        </div>
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
