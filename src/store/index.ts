import { createAction, configureStore, combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';

import authReducer from './authSlice';
import userReducer from './userSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const preloadedState = persistedState ? persistedState : {};

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export const logoutAction = createAction('logout');

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // check for logout action type
  if (logoutAction.match(action)) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export type RootState = ReturnType<typeof appReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
