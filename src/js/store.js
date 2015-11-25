import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const wrapperCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware // Must be the last middleware to be included.
  ),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
  return wrapperCreateStore(reducers, initialState);
}
