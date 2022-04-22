import { IDrinkDoc } from './db/Drink';
// Express.js
declare module 'express-serve-static-core' {
  interface Request {
    id?: string;
  }
}

// API types
export type TokenResult = IApiResultBaseOf<IAuthToken>;

export type RefreshTokenResult = IApiResultBaseOf<IRefreshToken>;

export type YoutubeVideo = {
  id?: string;
  title?: string;
  channelTitle?: string;
  description?: string;
  publishedAt?: string;
};
export interface IApiResultBase {
  statusCode: number;
  message: string;
}

export interface IApiResultBaseOf<T> extends IApiResultBase {
  data: T[];
}
export interface IAuthToken {
  userId: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
export interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
}

export interface IRegistration {
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResult {
  token: TokenResult;
  drinks: IDrinkDoc[];
}

export interface ISearchResult {
  idDrink: string;
  strDrink?: string;
  strTags?: string[];
  strIBA?: string;
  strAlcoholic?: string;
  strGlass?: string;
  strInstructions?: string;
  strDrinkThumb?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strImageSource?: string;
}
export interface IGetVideosResult {
  drinkId: string;
  videos: YoutubeVideo[];
}
