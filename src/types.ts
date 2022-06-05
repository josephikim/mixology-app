import { IUserCollectionItemDoc } from './db/UserCollectionItem';

// Express.js
declare module 'express-serve-static-core' {
  interface Request {
    id?: string;
  }
}

// API types
export type YoutubeVideo = {
  id?: string;
  title?: string;
  channelTitle?: string;
  description?: string;
  publishedAt?: string;
};

export type ApiAccessError = {
  type: string;
  message: string;
};

export interface IAuthToken {
  userId: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  tokenType: string;
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
  token: IAuthToken;
  collection: IUserCollectionItemDoc[];
}
