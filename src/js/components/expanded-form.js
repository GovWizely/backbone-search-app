var React = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var Select       = require('./aggregation-select');

export default React.createClass({
  displayName: 'ExpandedForm',
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
      <div>
        <div className="row page-header">
          <Header cssClass="text-center" />
        </div>

        <div className="row">
          <div className="col-md-8 keyword-input expanded">
            <p className="text-muted">Search by Keyword</p>
            <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } />
          </div>

          <div className="col-md-4 category-input">
            <p className="text-muted">Search by Category</p>
        <Select onChange={ this.props.onCountryChange }  placeholder="Select Country" items={ this.props.aggregations.countries } values={ [] } onSubmit={ this.props.onSubmit } />
            <p className="text-muted separator">And / Or</p>
            <Select onChange={ this.props.onIndustryChange } placeholder="Select Industry" items={ this.props.aggregations.industries } values={ this.props.industries } onSubmit={ this.props.onSubmit } />

            <button type="button" role="button" className="btn btn-primary submit" onClick={ this.props.onSubmit }>Search</button>
          </div>
        </div>
      </div>
    );
  }
});
