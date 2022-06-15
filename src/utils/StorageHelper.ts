import store from 'store/index';

export class StorageHelper {
  static getLocalAccessToken = (): string => {
    const accessToken = store.getState().auth.accessToken;
    return accessToken;
  };

  static getLocalRefreshToken = (): string => {
    const refreshToken = store.getState().auth.refreshToken;
    return refreshToken;
  };
}
