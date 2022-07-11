import _ from 'lodash';

import { RootState } from '.';
import { initialState as authInitialState } from './authSlice';
import { initialState as baseInitialState } from './baseSlice';
import { initialState as userInitialState } from './userSlice';
import { initialState as alertInitialState } from './alertSlice';

export const loadState = (): JSON | undefined => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState == null) {
      return undefined;
    }

    const json = JSON.parse(serializedState);
    const isAuthStateValid = _.isEqual(Object.keys(json.auth), Object.keys(authInitialState));
    const isBaseStateValid = _.isEqual(Object.keys(json.base), Object.keys(baseInitialState));
    const isUserStateValid = _.isEqual(Object.keys(json.user), Object.keys(userInitialState));
    const isAlertStateValid = _.isEqual(Object.keys(json.alert), Object.keys(alertInitialState));
    const isRootStateValid = _.isEqual(Object.keys(json).sort(), ['auth', 'base', 'user', 'alert'].sort());

    if (!isAuthStateValid || !isBaseStateValid || !isUserStateValid || !isAlertStateValid || !isRootStateValid) {
      return undefined;
    } else {
      return json;
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    Promise.reject(err);
  }
};
