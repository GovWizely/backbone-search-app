var React          = require('react');

var Header       = require('./header');
var KeywordInput = require('./keyword-input');
var Select       = require('./aggregation-select');

module.exports = React.createClass({
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
          <Select type="countries" placeholder="Select Country" value={ this.props.countries } onChange={ this.props.onCountryChange } items={ this.props.aggregations.countries }  />
        </div>

        <div className="col-md-2">
          <Select type="industries" placeholder="Select Industry" value={ this.props.industries } onChange={ this.props.onIndustryChange } items={ this.props.aggregations.industries }/>
        </div>

      </div>
    );
  }
});
