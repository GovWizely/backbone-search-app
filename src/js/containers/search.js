import React from 'react';
import Form from '../components/expanded-form';

export default React.createClass({
  displayName: 'Search',
  render: function() {
    return <Form { ...this.props } />;
  }
});
