import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Header from './header';
import Select from './aggregation-select';

var Form = React.createClass({
  displayName: 'CondensedForm',
  render: function() {
    const {
      fields: { keyword, countries, industries },
      handleSubmit
    } = this.props;
    return (
      <form className="row">
        <div className="col-md-3">
          <Header cssClass="header-condensed" />
        </div>

        <div className="col-md-4 keyword-input condensed">
          <div className="input-group">
        <input type="text" className="form-control" ref="keyword" placeholder="Keyword" { ...keyword } />
            <span className="input-group-btn">
              <button className="btn btn-success" onClick={ handleSubmit }>
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Country" items={ this.props.aggregations.countries } onSubmit={ handleSubmit } { ...countries } />
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Industry" items={ this.props.aggregations.industries } onSubmit={ handleSubmit } { ...industries } />
        </div>

        <div className="col-md1">
          <button type="button" role="button" className="btn btn-primary" onClick={ handleSubmit }>Search</button>
        </div>
      </form>
    );
  }
});

Form.propTypes = {
  aggregations: React.PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: 'form',
  fields: ['keyword', 'countries', 'industries']
})(Form);
