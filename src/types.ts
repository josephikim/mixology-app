// Express.js types
declare module 'express-serve-static-core' {
  interface Request {
    id?: string;
  }
}

// API types
export type TokenResult = IApiResultBaseOf<IAuthToken>;
export type AddBottleResult = IApiResultBaseOf<IBottle>;

export interface IApiResultBase {
  statusCode: number;
  message: string;
  success: boolean;
  errorCode: string;
}

export interface IApiResultBaseOf<T extends IAuthToken | IBottle> extends IApiResultBase {
  data: T[];
}

export interface IRegistration {
  email: string;
  password: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface IBottle {
  id: number;
  category: string;
  name: string;
  producer: string;
  country: string;
  price: number;
  rating?: number;
}

export interface IWine extends IBottle {
  style: string;
  abv: number;
  vintage?: number;
}

export interface ISpirit extends IBottle {
  type: string;
  proof: number;
  year?: number;
}

// Redux types
const RegistrationStartActionType = 'RegistrationStart';
const RegistrationSuccessActionType = 'RegistrationSuccess';
const RegistrationFailActionType = 'RegistrationFail';
const LoginStartActionType = 'LoginStart';
const LoginSuccessActionType = 'LoginSuccess';
const LoginFailActionType = 'LoginFail';
const LogoutUserActionType = 'LogoutUser';
const AddBottleActionType = 'AddBottle';
const SetCellarViewActionType = 'SetCellarView';

export interface IBaseAction<T, P> {
  readonly type: T;
  readonly payload: P;
}

export type RegistrationStartAction = IBaseAction<typeof RegistrationStartActionType, null>;
export type RegistrationSuccessAction = IBaseAction<typeof RegistrationSuccessActionType, IAuthToken>;
export type RegistrationFailAction = IBaseAction<typeof RegistrationFailActionType, null>;
export type LoginStartAction = IBaseAction<typeof LoginStartActionType, null>;
export type LoginSuccessAction = IBaseAction<typeof LoginSuccessActionType, IAuthToken>;
export type LoginFailAction = IBaseAction<typeof LoginFailActionType, null>;
export type LogoutUserAction = IBaseAction<typeof LogoutUserActionType, null>;
export type AddBottleAction = IBaseAction<typeof AddBottleActionType, IBottle>;
export type SetCellarViewAction = IBaseAction<typeof SetCellarViewActionType, string>;

export type IAction =
  | RegistrationStartAction
  | RegistrationSuccessAction
  | RegistrationFailAction
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutUserAction
  | AddBottleAction
  | SetCellarViewAction;

export type IDispatch = (action: IAction) => void;

// Redux action creators
export const createRegistrationStartAction = (): RegistrationStartAction => {
  return createAction(RegistrationStartActionType, null);
};

export const createRegistrationSuccessAction = (payload: IAuthToken): RegistrationSuccessAction => {
  return createAction(RegistrationSuccessActionType, payload);
};

export const createRegistrationFailAction = (): RegistrationFailAction => {
  return createAction(RegistrationFailActionType, null);
};

export const createLoginStartAction = (): LoginStartAction => {
  return createAction(LoginStartActionType, null);
};

export const createLoginSuccessAction = (payload: IAuthToken): LoginSuccessAction => {
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

const createAction = <T extends string, P>(type: T, payload: P): IBaseAction<T, P> => {
  return { type, payload };
};
