import { ITokenModel } from '../models';

const TOKEN_RESULT = 'TOKEN_RESULT';

export class StorageHelper {
  static setTokenResult(tokenModel: ITokenModel): void {
    localStorage.setItem(TOKEN_RESULT, JSON.stringify(tokenModel));
  }

  static onSignOut(): void {
    localStorage.removeItem(TOKEN_RESULT);
  }

  static tryGetTokenResult(): Promise<ITokenModel | null> {
    return new Promise((resolve, reject) => {
      try {
        const res = localStorage.getItem(TOKEN_RESULT);
        if (res !== null) {
          resolve(<ITokenModel>JSON.parse(res));
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
