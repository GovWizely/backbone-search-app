var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');

module.exports = React.createClass({
  displayName: 'AggregationSelect',
  propTypes: {
    items       : React.PropTypes.array.isRequired,
    onChange    : React.PropTypes.func.isRequired,
    onSubmit    : React.PropTypes.func,
    placeholder : React.PropTypes.string,
    values      : React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      items: [],
      placeholder: 'Select Options'
    };
  },
  getInitialState: function() {
    return {
      isLoading: _.isEmpty(this.props.items)
    };
  },
  componentDidMount: function() {
    this.refs.select.handleKeyDown = (function(handleKeyDown) {
      return function(event) {
        handleKeyDown(event);
        if (event.which === 13 && !this.refs.select.state.isOpen) {
          if (_.isFunction(this.props.onSubmit)) {
            this.props.onSubmit(event);
          }
        }
      }.bind(this);
    }).bind(this)(this.refs.select.handleKeyDown);
  },
  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.items)) {
      this.setState({ isLoading: false });
    }
  },
  options: function() {
    return _.map(this.props.items, function(item) {
      return { label: item.key, value: item.key };
    });
  },
  render: function() {
    return (
      <Select ref="select" isLoading={ this.state.isLoading } name="countries" multi placeholder={ this.props.placeholder } options={ this.options() } onChange={ this.props.onChange } value={ this.props.values } />
    );
  }
});
