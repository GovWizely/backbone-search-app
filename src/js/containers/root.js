import React from 'react';
import { Provider } from 'react-redux';
import { DebugPanel, DevTools, LogMonitor } from 'redux-devtools/lib/react';
import configureStore from '../store';
import App from './app';

const store = configureStore();

export default React.createClass({
  displayName: 'Root',
  render: function() {
    return (
      <div>
        <Provider store={ store }>
          <App />
        </Provider>
      </div>
    );
  }
});
