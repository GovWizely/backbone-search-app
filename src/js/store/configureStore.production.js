import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState, history) {
  return createStore(reducers, initialState, compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    )
  ));
}
