import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';

const configureStore = (): any => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
};

export default configureStore;
