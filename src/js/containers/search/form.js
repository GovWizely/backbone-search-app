import React, { PropTypes } from 'react';

import _Form from '../../components/form';

const Form = ({ onSubmit, query }) => (
  <div className="mi-search__form">
    <_Form
      expanded={false}
      onSubmit={onSubmit}
      query={query}
    />
  </div>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

export default Form;
