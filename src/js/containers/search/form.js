import React from 'react';

import _Form from '../../components/form';

var Form = ({ onSubmit, query }) => {
  return (
    <div className="mi-search__form">
      <_Form
         expanded={ false }
         onSubmit={ onSubmit }
         query={ query } />
    </div>
  );
};

export default Form;
