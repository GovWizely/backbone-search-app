import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState, history) {
  return createStore(reducers, initialState, compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
//      loggerMiddleware // Must be the last middleware to be included.
    )
  ));
}
