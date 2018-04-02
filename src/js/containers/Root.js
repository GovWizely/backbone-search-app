import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';

import App from './app';
import Index from './index';
import Search from './search';

const Root = ({ history, store, use_index_page }) => {
  if (use_index_page == false){
    return(
      <Provider store={ store }>
        <Router history={ history }>
          <Route component={ App }>
            <Route path="/" component={ Search } />
            <Route path="search(/:api)" component={ Search } />
          </Route>
        </Router>
      </Provider>
    );
  }
  else {
    return(
      <Provider store={ store }>
        <Router history={ history }>
          <Route component={ App }>
            <Route path="/" component={ Index } />
            <Route path="search(/:api)" component={ Search } />
          </Route>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
