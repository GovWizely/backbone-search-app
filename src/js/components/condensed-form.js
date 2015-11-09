var React          = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var Select       = require('./aggregation-select');

module.exports = React.createClass({
  displayName: 'CondensedForm',
  propTypes: {
    aggregations: React.PropTypes.object.isRequired,
    countries: React.PropTypes.string.isRequired,
    industries: React.PropTypes.string.isRequired,
    keyword: React.PropTypes.string.isRequired,
    onCountryChange: React.PropTypes.func.isRequired,
    onIndustryChange: React.PropTypes.func.isRequired,
    onKeywordChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Header cssClass="header-condensed" />
        </div>

        <div className="col-md-4 keyword-input condensed">
          <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } expanded={ false } />
        </div>

        <div className="col-md-2">
        <Select placeholder="Select Country" values={ this.props.countries } onChange={ this.props.onCountryChange } items={ this.props.aggregations.countries } onSubmit={ this.props.onSubmit } />
        </div>

        <div className="col-md-2">
          <Select placeholder="Select Industry" values={ this.props.industries } onChange={ this.props.onIndustryChange } items={ this.props.aggregations.industries } onSubmit={ this.props.onSubmit } />
        </div>

        <div className="col-md1">
          <button type="button" role="button" className="btn btn-primary" onClick={ this.props.onSubmit }>Search</button>
        </div>
      </div>
    );
  }
});
