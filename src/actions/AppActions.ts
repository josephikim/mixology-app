import {
  createLoginStartAction,
  createLoginSuccessAction,
  createLoginFailAction,
  createLogoutUserAction,
  IDispatch,
  ILoginCredentials,
  TokenResult
} from '../types';
import { AuthApi } from '../api';
import { StorageHelper } from '../utils';

export const login: (credentials: ILoginCredentials) => (dispatch: IDispatch) => Promise<void> = (
  credentials: ILoginCredentials
) => {
  const api = new AuthApi();
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      const loginStartAction = createLoginStartAction();
      dispatch(loginStartAction);
      const result: TokenResult = await api.login(credentials);
      if (result.statusCode == 200) {
        const loginSuccessAction = createLoginSuccessAction(result.data[0]);
        dispatch(loginSuccessAction);
        StorageHelper.setTokenResult(result.data[0]);
      } else {
        const loginFailAction = createLoginFailAction();
        dispatch(loginFailAction);
      }
    } catch (error) {
      const loginFailAction = createLoginFailAction();
      dispatch(loginFailAction);
    }
  };
};

export const signOut: () => (dispatch: IDispatch) => Promise<void> = () => {
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      StorageHelper.onSignOut();
      const logoutUserAction = createLogoutUserAction();
      dispatch(logoutUserAction);
    } catch (error) {
      console.log({ error: error });
    }
  };
};
