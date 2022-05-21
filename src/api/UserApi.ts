import axios from 'axios';

import settings from './Settings';
import * as ApiHelper from '../utils/ApiHelper';
import { StorageHelper } from '../utils/StorageHelper';
import store from '../store/index';
import { accessTokenUpdated } from '../store/authSlice';
import { NotesPayload, SearchPayload } from '../store/userSlice';
import { IDrinkDoc } from '../db/Drink';
import { IKeywordDoc } from '../db/Keyword';
import { IUserCollectionItemDoc } from '../db/UserCollectionItem';

const userApiClient = axios.create({
  baseURL: settings.baseUrl,
  headers: ApiHelper.createHeaders()
});

userApiClient.interceptors.request.use(
  async (config) => {
    if (config.url === '/auth/refreshtoken') return config;

    const token = await StorageHelper.getLocalAccessToken();

    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

userApiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await userApiClient.post('/auth/refreshtoken', {
            refreshToken: StorageHelper.getLocalRefreshToken()
          });

          const newAccessToken = res.data.accessToken;

          userApiClient.defaults.headers.common['x-access-token'] = newAccessToken;

          // authorize user
          store.dispatch(accessTokenUpdated(newAccessToken));

          return userApiClient(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export class UserApi {
  async getKeywords(): Promise<IKeywordDoc[]> {
    const url = `${userApiClient.defaults.baseURL}/keywords/`;
    const response = await userApiClient.get(url);

    return response.data as IKeywordDoc[];
  }

  async getRandomDrink(): Promise<IDrinkDoc> {
    const url = `${userApiClient.defaults.baseURL}/randomDrink/`;
    const response = await userApiClient.get(url);

    return response.data as IDrinkDoc;
  }

  async getDrinks(): Promise<IDrinkDoc[]> {
    const url = `${userApiClient.defaults.baseURL}/drinks/`;
    const response = await userApiClient.get(url);

    return response.data as IDrinkDoc[];
  }

  async getSearchResults(payload: SearchPayload): Promise<IDrinkDoc[]> {
    const url = `${userApiClient.defaults.baseURL}/search/${payload.type}/${payload.query}`;
    const response = await userApiClient.get(url);

    let results = [] as IDrinkDoc[];

    if (response.status === 200 && response.data.length > 0) {
      results = response.data as IDrinkDoc[];
    }

    return results;
  }

  async addCollectionItem(idDrink: string): Promise<IUserCollectionItemDoc> {
    const userId = store.getState().auth.userId;

    const payload = {
      user: userId,
      idDrink: idDrink
    };

    const url = `${userApiClient.defaults.baseURL}/addCollectionItem`;
    const response = await userApiClient.post(url, payload);

    return response.data as IUserCollectionItemDoc;
  }

  async saveNotes(payload: NotesPayload): Promise<IUserCollectionItemDoc> {
    const url = `${userApiClient.defaults.baseURL}/saveNotes`;
    const response = await userApiClient.post(url, payload);

    return response.data as IUserCollectionItemDoc;
  }

  async deleteCollectionItem(idDrink: string): Promise<IUserCollectionItemDoc> {
    const url = `${userApiClient.defaults.baseURL}/deleteCollectionItem/${idDrink}`;
    const response = await userApiClient.post(url);

    return response.data as IUserCollectionItemDoc;
  }
}
