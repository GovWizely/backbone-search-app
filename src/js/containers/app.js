import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';

const store = configureStore();

export default React.createClass({
  render: function() {
    return (
      <Provider store={ store }>
        { this.props.children }
      </Provider>
    );
  }
});
