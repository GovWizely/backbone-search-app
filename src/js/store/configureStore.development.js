import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import immutableMiddleware from 'redux-immutable-state-invariant';
import reducers from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState, history) {
  return createStore(reducers, initialState, compose(
    applyMiddleware(
      immutableMiddleware(),
      routerMiddleware(history),
      thunkMiddleware,
      loggerMiddleware // Must be the last middleware to be included.
    )
  ));
}
