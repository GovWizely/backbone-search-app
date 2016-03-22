import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from '../components/form';
import { selectAPIs } from '../actions/api';


const Index = React.createClass({
  displayName: 'Index',
  propTypes: {
    defaultAPIs: PropTypes.array.isRequired,
    dispatch: PropTypes.func,
    onSubmit: PropTypes.func
  },
  componentDidMount: function() {
    const { dispatch, defaultAPIs } = this.props;
    dispatch(selectAPIs(defaultAPIs));
  },
  render: function() {
    const props = {
      focused: true,
      onSubmit: this.props.onSubmit
    };
    return (
      <div id="mi-index">
        <Form {...props} />
      </div>
    );
  }
});

export default connect()(Index);
