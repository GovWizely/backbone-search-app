// enable bootstrap js component
import React from 'react';
import { render } from 'react-dom';
import { createHashHistory as createHistory } from 'history';
import { IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

import App from './js/containers/app';
import Index from './js/containers/index';
import Search from './js/containers/search';
import AdhocReport from './js/containers/adhoc-report';
import configureStore from './js/store';

const history = createHistory({ });
const store = configureStore();

syncReduxAndRouter(history, store);

render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route component={ App }>
<<<<<<< b375db0d3fbae09dbed47db0099007759f1498a4
        <Route path="/" component={ Index } />
        <Route path="search(/:resource)" component={ Search } />
        <Route path="adhoc_report(/:resource)" component={ AdhocReport } />
||||||| merged common ancestors
        <Route path="/" component={ Search } />
        <Route path="search(/:resource)" component={ Result } />
=======
        <Route path="/" component={ Index } />
        <Route path="search(/:resource)" component={ Search } />
        <Route path="adhoc-report(/:resource)" component={ AdhocReport } />
>>>>>>> add new screen for adhoc report
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
