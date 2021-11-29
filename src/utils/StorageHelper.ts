import { IAuthToken } from '../types';

const TOKEN_RESULT = 'TOKEN_RESULT';

export class StorageHelper {
  static setTokenResult(token: IAuthToken): void {
    localStorage.setItem(TOKEN_RESULT, JSON.stringify(token));
  }

  static onSignOut(): void {
    localStorage.removeItem(TOKEN_RESULT);
  }

  static tryGetTokenResult(): Promise<IAuthToken | null> {
    return new Promise((resolve, reject) => {
      try {
        const res = localStorage.getItem(TOKEN_RESULT);
        if (res !== null) {
          resolve(<IAuthToken>JSON.parse(res));
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
