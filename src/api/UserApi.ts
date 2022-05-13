import axios from 'axios';

import settings from './Settings';
import store from '../store/index';
import * as ApiHelper from '../utils/ApiHelper';
import { StorageHelper } from '../utils/StorageHelper';
import { accessTokenUpdated } from '../store/authSlice';
import { NotesPayload, SearchPayload } from '../store/userSlice';
import { ISearchResult, IGetVideosResult } from '../types';
import { IDrinkDoc } from '../db/Drink';
import { IKeywordDoc } from '../db/Keyword';

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

  async getRandomDrink(): Promise<ISearchResult> {
    const url = `${userApiClient.defaults.baseURL}/randomDrink/`;
    const response = await userApiClient.get(url);

    return response.data as ISearchResult;
  }

  async addDrink(idDrink: string): Promise<IDrinkDoc> {
    const userId = store.getState().auth.userId;
    const storedResult = store
      .getState()
      .user.searchResults.filter((result: ISearchResult) => result.idDrink == idDrink)[0];
    const storedResultClone = JSON.parse(JSON.stringify(storedResult));

    const drink = {
      ...storedResultClone,
      idDrinkApi: storedResultClone.idDrink,
      user: userId,
      rating: undefined
    };

    delete drink['idDrink'];

    const url = `${userApiClient.defaults.baseURL}/addDrink`;
    const response = await userApiClient.post(url, drink);

    return response.data as IDrinkDoc;
  }

  async saveNotes(payload: NotesPayload): Promise<IDrinkDoc> {
    const url = `${userApiClient.defaults.baseURL}/saveNotes`;
    const response = await userApiClient.post(url, payload);

    return response.data as IDrinkDoc;
  }

  async deleteDrink(drinkId: string): Promise<IDrinkDoc> {
    const url = `${userApiClient.defaults.baseURL}/deleteDrink/${drinkId}`;
    const response = await userApiClient.post(url);

    return response.data as IDrinkDoc;
  }

  async getVideos(drinkId: string): Promise<IGetVideosResult> {
    const url = `${userApiClient.defaults.baseURL}/getVideos/${drinkId}`;
    const response = await userApiClient.get(url);

    return response.data as IGetVideosResult;
  }

  async getSearchResults(payload: SearchPayload): Promise<ISearchResult[]> {
    const url = `${userApiClient.defaults.baseURL}/search/${payload.type}/${payload.query}`;
    const response = await userApiClient.get(url);

    let results = [];

    if (response.status === 200 && response.data.length > 0) {
      results = response.data;
    }

    return results as ISearchResult[];
  }
}
