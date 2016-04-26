require('../styles/app.scss');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { createHashHistory as createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import configureStore from './js/store/configureStore';
import Root from './js/containers/Root';

function renderToElement(elementId, options) {
  const history = createHistory({ });
  const store = configureStore(options);

  syncReduxAndRouter(history, store);
  render(
    <Root history={ history } store={ store } />,
    document.getElementById(elementId)
  );
}

export default renderToElement;
window.MarketIntelligenceSearchApp = {
  render: renderToElement
};
