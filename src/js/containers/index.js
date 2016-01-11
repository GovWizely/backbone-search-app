import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../components/form';

const Index = React.createClass({
  displayName: 'Index',
  propTypes: {
    aggregations: PropTypes.object,
    onSubmit: PropTypes.func
  },
  render: function() {
    const props = {
      aggregations: this.props.aggregations,
      onSubmit: this.props.onSubmit };
    return <Form {...props} />;
  }
});


function mapStateToProps(state) {
  const { aggregations } = state;

  return {
    aggregations
  };
}

export default connect(mapStateToProps)(Index);
