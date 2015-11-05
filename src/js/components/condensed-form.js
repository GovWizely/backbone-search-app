var React          = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var Select       = require('./aggregation-select');

module.exports = React.createClass({
  displayName: 'CondensedForm',
  render: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Header cssClass="header-condensed" />
        </div>

        <div className="col-md-5">
          <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } expanded={ false } />
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Country" values={ this.props.countries } onChange={ this.props.onCountryChange } items={ this.props.aggregations.countries } onSubmit={ this.props.onSubmit } />
        </div>

        <div className="col-md-2">
          <Select placeholder="Select Industry" values={ this.props.industries } onChange={ this.props.onIndustryChange } items={ this.props.aggregations.industries } onSubmit={ this.props.onSubmit } />
        </div>

      </div>
    );
  }
});
