var React = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var Select       = require('./aggregation-select');

module.exports = React.createClass({
  displayName: 'ExpandedForm',
  render: function() {
    return (
      <div>
        <div className="row page-header">
          <Header cssClass="text-center" />
        </div>

        <div className="row">
          <div className="col-md-8 keyword-input">
            <p className="text-muted">Search by Keyword</p>
            <KeywordInput keyword={ this.props.keyword } onSubmit={ this.props.onSubmit } onChange={ this.props.onKeywordChange } />
          </div>

          <div className="col-md-4 category-input">
            <p className="text-muted">Search by Category</p>
            <Select onChange={ this.props.onCountryChange }  placeholder="Select Country" items={ this.props.aggregations.countries } values={ this.props.countries } onSubmit={ this.props.onSubmit } />
            <p className="text-muted separator">And</p>
            <Select onChange={ this.props.onIndustryChange } placeholder="Select Industry" items={ this.props.aggregations.industries } values={ this.props.industries } onSubmit={ this.props.onSubmit } />
          </div>
        </div>
      </div>
    );
  }
})
