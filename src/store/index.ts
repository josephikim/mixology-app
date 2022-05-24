import { createAction, configureStore, combineReducers, AnyAction, Reducer } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';

import baseReducer from './baseSlice';
import authReducer, { initialState as initialAuthState } from './authSlice';
import userReducer, { initialState as initialUserState } from './userSlice';
import alertReducer, { initialState as initialAlertState } from './alertSlice';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const preloadedState = persistedState ? persistedState : {};

const appReducer = combineReducers({
  base: baseReducer,
  auth: authReducer,
  user: userReducer,
  alert: alertReducer
});

export const logoutAction = createAction('logout');

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // logout action
  if (logoutAction.match(action)) {
    const loggedOutState = {
      ...state,
      auth: initialAuthState,
      user: initialUserState,
      alert: initialAlertState
    };

    return appReducer(loggedOutState, action);
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
