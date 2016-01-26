import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/dev-tools';
import reducers from '../reducers';

const loggerMiddleware = createLogger();

const wrapperCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware // Must be the last middleware to be included.
  ),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = wrapperCreateStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', function() {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
