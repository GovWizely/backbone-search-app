import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const loggerMiddleware = createLogger();

const wrapperCreateStore = compose(
  applyMiddleware(
    thunkMiddleware
  )
)(createStore);

export default function configureStore(initialState) {
  return wrapperCreateStore(reducers, initialState);
}
