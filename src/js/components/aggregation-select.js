var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');

var Store = require('../stores/aggregation-store');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      items: [],
      type: null,
      placeholder: "Select Options"
    };
  },
  getInitialState: function() {
    return {
      values: [],
      isLoading: _.isEmpty(this.props.items)
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.items)) {
      this.setState({ isLoading: false });
    }
  },
  onChange: function(values, __) {
    if (values) {
      this.setState({ values: _.compact(values.split(',')) });
    } else {
      this.setState({ values: [] });
    }
    if ((typeof this.props.onChange) === 'function') {
      this.props.onChange(values);
    }
  },
  options: function() {
    return _.map(this.props.items, function(item) {
      return { label: item.key, value: item.key };
    });
  },
  render: function() {
    return (
      <Select isLoading={ this.state.isLoading } name="countries" multi={ true } placeholder={ this.props.placeholder } options={ this.options() } onChange={ this.onChange } value={ this.state.values } />
    );
  }
});
