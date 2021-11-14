import {
  createLoginStartAction,
  createLoginSuccessAction,
  createLoginFailAction,
  createLogoutUserAction
} from './Types';
import { IDispatch } from '../Globals';
import { UserApi } from '../api';
import { StorageHelper } from '../utils';
import { ILoginModel } from '../models';
import { TokenResult } from '../models/ResultTypes';

export const login: (model: ILoginModel) => (dispatch: IDispatch) => Promise<void> = (model: ILoginModel) => {
  const api = new UserApi();
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      const loginStartAction = createLoginStartAction();
      dispatch(loginStartAction);
      const result: TokenResult = await api.login(model);
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

export function signOut(): (dispatch: IDispatch) => Promise<void> {
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      StorageHelper.onSignOut();
      const logoutUserAction = createLogoutUserAction();
      dispatch(logoutUserAction);
    } catch (error) {
      console.log({ error: error });
    }
  };
}
