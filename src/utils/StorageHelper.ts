import { AxiosInstance } from 'axios';
import { Response } from 'express';

import store from '../store/index';

export interface IRefreshTokenResponse extends Response {
  data: {
    accessToken: string;
  };
}
export class StorageHelper {
  static getLocalAccessToken = (): string | null => {
    const accessToken = store.getState().auth.accessToken;
    return accessToken;
  };

  static getLocalRefreshToken = (): string | null => {
    const refreshToken = store.getState().auth.refreshToken;
    return refreshToken;
  };

  static refreshToken = (userApiClient: AxiosInstance): Promise<IRefreshTokenResponse> => {
    return userApiClient.post('/refreshtoken', {
      refreshToken: this.getLocalRefreshToken()
    });
  };
}
