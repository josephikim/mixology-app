// Express.js
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
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
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
