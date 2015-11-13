import React from 'react';
import { History } from 'react-router';

import Form from '../components/form';

export default React.createClass({
  displayName: 'Search',
  mixins: [ History ],
  handleSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return <Form onSubmit={ this.handleSubmit } expanded history={ this.history } />;
  }
});
