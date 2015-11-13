// enable bootstrap js component
require('bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { IndexRoute, Router, Route } from 'react-router';

import App from './js/containers/app';
import Search from './js/containers/search';
import Result from './js/containers/result';

render((
  <Router history={ createHashHistory() }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Search } />
      <Route path="search" component={ Result } />
    </Route>
  </Router>
), document.getElementById('main'));
