var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');

module.exports = React.createClass({
  displayName: 'AggregationSelect',
  getDefaultProps: function() {
    return {
      items: [],
      placeholder: "Select Options"
    };
  },
  getInitialState: function() {
    return {
      values: [],
      isLoading: _.isEmpty(this.props.items)
    };
  },
  componentDidMount: function() {
    this.refs.select.handleKeyDown = (function(handleKeyDown) {
      return function(event) {
        handleKeyDown(event);
        if (event.which === 13 && !this.refs.select.state.isOpen) {
          this.props.onSubmit(event);
        }
      }.bind(this);
    }).bind(this)(this.refs.select.handleKeyDown);
  },
  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.items)) {
      this.setState({ isLoading: false });
    }
  },
  handleChange: function(values) {
    if (values) {
      this.setState({ values: _.compact(values.split(',')) });
    } else {
      this.setState({ values: [] });
    }
    if (_.isFunction(this.props.onChange)) {
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
        <Select ref="select" isLoading={ this.state.isLoading } name="countries" multi={ true } placeholder={ this.props.placeholder } options={ this.options() } onClick={this.onEnter } onChange={ this.handleChange } value={ this.state.values } />
    );
  }
});
