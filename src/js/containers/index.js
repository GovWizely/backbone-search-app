import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../components/form';

const Index = React.createClass({
  displayName: 'Index',
  propTypes: {
    onSubmit: PropTypes.func
  },
  render: function() {
    const props = {
      focused: true,
      onSubmit: this.props.onSubmit };
    return <Form {...props} />;
  }
});


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Index);
