require('../styles/app.scss');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './js/store/configureStore';
import Root from './js/containers/Root';

function renderToElement(elementId, options) {
  const store = configureStore(options, hashHistory);
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <Root history={ history } store={ store } />,
    document.getElementById(elementId)
  );
}

export default renderToElement;
window.MarketIntelligenceSearchApp = {
  render: renderToElement
};
