import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const Form = ({ fields, focused, handleSubmit }) => (
  <form className="mi-form" onSubmit={ handleSubmit }>
    <input
      className="mi-form__field"
      autoFocus={ focused }
      type="text"
      placeholder="Keyword"
      aria-label="Enter keyword"
      {...fields.q }
    />
    <span className="mi-form__submit">
      <button className="uk-button mi-form__submit__button" onClick={ handleSubmit } title="Search">
        <i className="mi-icon mi-icon-search" aria-label="Search"></i>
      </button>
    </span>
  </form>
);

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  focused: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  focused: false
};

export default reduxForm({
  form: 'form',
  fields: ['q']
}, state => ({
  initialValues: state.query
}))(Form);
