import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const wrapperCreateStore = compose(
  applyMiddleware(
    thunkMiddleware
  )
)(createStore);

export default function configureStore(initialState) {
  return wrapperCreateStore(reducers, initialState);
}
