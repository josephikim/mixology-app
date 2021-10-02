import { combineReducers } from 'redux';
import DemoReducer from './DemoReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  demo: DemoReducer,
  user: UserReducer
});

export default rootReducer;
