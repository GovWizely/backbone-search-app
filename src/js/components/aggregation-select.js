var _      = require('lodash');
var React  = require('react');
var Select = require('react-select');

function validValues(values, items) {
  if (!values) return [];
  return _.intersection(
    values.split(','), _.map(items, v => v.key)
  );
}
export default React.createClass({
  displayName: 'AggregationSelect',
  propTypes: {
    items       : React.PropTypes.array.isRequired,
    onChange    : React.PropTypes.func.isRequired,
    onSubmit    : React.PropTypes.func,
    placeholder : React.PropTypes.string,
    value       : React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      items: [],
      placeholder: 'Select Options'
    };
  },
  options: function() {
    return _.map(this.props.items, function(item) {
      return { label: item.key, value: item.key };
    });
  },
  render: function() {
    const { items, value, onChange } = this.props;
    const values = validValues(value, items);
    const isLoading = _.isEmpty(items);
    return (
      <Select
        isLoading={ isLoading }
        multi
        options={ this.options() }
        onBlur={ () => {} }
        onChange={ (val, items) => onChange(val) }
        value={ values } />
    );
  }
});
