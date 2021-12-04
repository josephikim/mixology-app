import { combineReducers } from 'redux';
import { AppReducer } from './appReducer';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer
});

export default rootReducer;
