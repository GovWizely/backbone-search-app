import React, { PropTypes } from 'react';
import Form from '../components/form';

export default React.createClass({
  displayName: 'Index',
  propTypes: {
    aggregations: PropTypes.object,
    onSubmit: PropTypes.func,
    query: PropTypes.object
  },
  render: function() {
    const props = {
      aggregations: this.props.aggregations,
      onSubmit: this.props.onSubmit,
      query: this.props.query };
    return <Form {...props} />;
  }
});
