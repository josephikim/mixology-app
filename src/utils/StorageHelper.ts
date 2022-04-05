import store from '../store/index';

export class StorageHelper {
  static getLocalAccessToken = (): string | null => {
    const accessToken = store.getState().auth.accessToken;
    return accessToken;
  };

  static getLocalRefreshToken = (): string | null => {
    const refreshToken = store.getState().auth.refreshToken;
    return refreshToken;
  };
}
