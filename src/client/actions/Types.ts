import { ITokenModel, IBottle } from '../models';
export interface IBaseAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

// Redux action types
const LoginStartActionType = 'LoginStart';
const LoginSuccessActionType = 'LoginSuccess';
const LoginFailActionType = 'LoginFail';
const LogoutUserActionType = 'LogoutUser';
const AddBottleActionType = 'AddBottle';
const SetCellarViewActionType = 'SetCellarView';

export type LoginStartAction = IBaseAction<typeof LoginStartActionType, null>;
export type LoginSuccessAction = IBaseAction<typeof LoginSuccessActionType, ITokenModel>;
export type LoginFailAction = IBaseAction<typeof LoginFailActionType, null>;
export type LogoutUserAction = IBaseAction<typeof LogoutUserActionType, null>;
export type AddBottleAction = IBaseAction<typeof AddBottleActionType, IBottle>;
export type SetCellarViewAction = IBaseAction<typeof SetCellarViewActionType, string>;

const createAction = <T extends string, P>(type: T, payload: P): IBaseAction<T, P> => {
  return { type, payload };
};

// Redux action creators
export const createLoginStartAction = (): LoginStartAction => {
  return createAction(LoginStartActionType, null);
};

export const createLoginSuccessAction = (payload: ITokenModel): LoginSuccessAction => {
  return createAction(LoginSuccessActionType, payload);
};

export const createLoginFailAction = (): LoginFailAction => {
  return createAction(LoginFailActionType, null);
};

export const createLogoutUserAction = (): LogoutUserAction => {
  return createAction(LogoutUserActionType, null);
};

export const createAddBottleAction = (payload: IBottle): AddBottleAction => {
  return createAction(AddBottleActionType, payload);
};

export const createSetCellarViewAction = (payload: string): SetCellarViewAction => {
  return createAction(SetCellarViewActionType, payload);
};
