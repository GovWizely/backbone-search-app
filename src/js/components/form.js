import Url from 'url';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Header from './header';

export const Form =  React.createClass({
  displayName: 'Form',
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
  render: function() {
    const { expanded, fields: { q }, handleSubmit } = this.props;
    const css = expanded ? 'mi-form mi-form-expanded' : 'mi-form mi-form-condensed';
    return (
      <div className={ css }>
        <div>
          <Header />
        </div>

        <form onSubmit={ handleSubmit }>
          <div className="mi-keyword">
            <input type="text" placeholder="Keyword" { ...q } title="Keyword" />
            <span>
              <button className="uk-button uk-button-success" onClick={ handleSubmit }>
                <i className="mi-icon mi-icon-search" title="Search"></i>
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
