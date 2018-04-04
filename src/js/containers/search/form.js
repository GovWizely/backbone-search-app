import React, { PropTypes } from 'react';

import ComponentForm from '../../components/Form';

const Form = ({ onSubmit, query, typeaheads, selectedAPIs }) => {
	return (
  <div className="mi-search__form">
    <ComponentForm
      expanded={ false }
      onSubmit={ onSubmit }
      query={ query }
      typeaheads={ typeaheads }
      selectedAPIs={ selectedAPIs }
    />
  </div>
);
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired
};

export default Form;
