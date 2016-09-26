import React, { PropTypes } from 'react';

import ComponentForm from '../../components/Form';

const Form = ({ onSubmit, query }) => (
  <div className="mi-search__form">
    <ComponentForm
      expanded={ false }
      onSubmit={ onSubmit }
      query={ query }
    />
  </div>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

export default Form;
