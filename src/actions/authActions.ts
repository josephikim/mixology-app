import {
  createRegistrationStartAction,
  createRegistrationSuccessAction,
  createRegistrationFailAction,
  createLoginStartAction,
  createLoginSuccessAction,
  createLoginFailAction,
  IDispatch,
  ILoginCredentials,
  IRegistration,
  TokenResult
} from '../types';
import { AuthApi } from '../api';
import { StorageHelper } from '../utils';

export const registerUser: (credentials: IRegistration) => (dispatch: IDispatch) => Promise<void> = (
  credentials: IRegistration
) => {
  const api = new AuthApi();
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      const registrationStartAction = createRegistrationStartAction();
      dispatch(registrationStartAction);
      const result: TokenResult = await api.registerUser(credentials);
      if (result.statusCode == 200) {
        const registrationSuccessAction = createRegistrationSuccessAction(result.data[0]);
        dispatch(registrationSuccessAction);
        StorageHelper.setTokenResult(result.data[0]);
      } else {
        const registrationFailAction = createRegistrationFailAction();
        dispatch(registrationFailAction);
      }
    } catch (error) {
      const registrationFailAction = createRegistrationFailAction();
      dispatch(registrationFailAction);
    }
  };
};

export const loginUser: (credentials: ILoginCredentials) => (dispatch: IDispatch) => Promise<void> = (
  credentials: ILoginCredentials
) => {
  const api = new AuthApi();
  return async (dispatch: IDispatch): Promise<void> => {
    try {
      const loginStartAction = createLoginStartAction();
      dispatch(loginStartAction);
      const result: TokenResult = await api.loginUser(credentials);
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
