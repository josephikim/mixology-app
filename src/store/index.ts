import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const preloadedState = persistedState ? persistedState : {};

const reducer = {
  auth: authReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
