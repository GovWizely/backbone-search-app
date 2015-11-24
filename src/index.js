// enable bootstrap js component
require('bootstrap');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { createHashHistory as createHistory } from 'history';
import { IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

import App from './js/containers/app';
import Search from './js/containers/search';
import Result from './js/containers/result';
import configureStore from './js/store';

const history = createHistory({ });
const store = configureStore();

syncReduxAndRouter(history, store);

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route component={ App }>
        <Route path="/" component={ Search } />
        <Route path="search(/:resource)" component={ Result } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
