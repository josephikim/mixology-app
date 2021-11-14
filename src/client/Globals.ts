import {
  LoginStartAction,
  LoginSuccessAction,
  LoginFailAction,
  LogoutUserAction,
  AddBottleAction,
  SetCellarViewAction
} from './actions/Types';

export type IAction =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutUserAction
  | AddBottleAction
  | SetCellarViewAction;

export type IDispatch = (action: IAction) => void;
