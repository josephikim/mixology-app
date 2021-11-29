import { combineReducers } from 'redux';
import { AppReducer } from './AppReducer';
import { UserReducer } from './UserReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  user: UserReducer
});

export default rootReducer;
