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

  async getRandomDrink(): Promise<IDrinkDoc> {
    const url = `${userApiClient.defaults.baseURL}/randomDrink/`;
    const response = await userApiClient.get(url);

    return response.data as IDrinkDoc;
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
      results = response.data.map((drink: ISearchResult) => {
        return {
          idDrink: drink.idDrink,
          ...(!!drink.strDrink && { strDrink: drink.strDrink }),
          ...(!!drink.strTags && { strTags: drink.strTags }),
          ...(!!drink.strIBA && { strIBA: drink.strIBA }),
          ...(!!drink.strAlcoholic && { strAlcoholic: drink.strAlcoholic }),
          ...(!!drink.strGlass && { strGlass: drink.strGlass }),
          ...(!!drink.strInstructions && { strInstructions: drink.strInstructions }),
          ...(!!drink.strDrinkThumb && { strDrinkThumb: drink.strDrinkThumb }),
          ...(!!drink.strIngredient1 && { strIngredient1: drink.strIngredient1 }),
          ...(!!drink.strIngredient2 && { strIngredient2: drink.strIngredient2 }),
          ...(!!drink.strIngredient3 && { strIngredient3: drink.strIngredient3 }),
          ...(!!drink.strIngredient4 && { strIngredient4: drink.strIngredient4 }),
          ...(!!drink.strIngredient5 && { strIngredient5: drink.strIngredient5 }),
          ...(!!drink.strIngredient6 && { strIngredient6: drink.strIngredient6 }),
          ...(!!drink.strIngredient7 && { strIngredient7: drink.strIngredient7 }),
          ...(!!drink.strIngredient8 && { strIngredient8: drink.strIngredient8 }),
          ...(!!drink.strIngredient9 && { strIngredient9: drink.strIngredient9 }),
          ...(!!drink.strMeasure1 && { strMeasure1: drink.strMeasure1 }),
          ...(!!drink.strMeasure2 && { strMeasure2: drink.strMeasure2 }),
          ...(!!drink.strMeasure3 && { strMeasure3: drink.strMeasure3 }),
          ...(!!drink.strMeasure4 && { strMeasure4: drink.strMeasure4 }),
          ...(!!drink.strMeasure5 && { strMeasure5: drink.strMeasure5 }),
          ...(!!drink.strMeasure6 && { strMeasure6: drink.strMeasure6 }),
          ...(!!drink.strMeasure7 && { strMeasure7: drink.strMeasure7 }),
          ...(!!drink.strMeasure8 && { strMeasure8: drink.strMeasure8 }),
          ...(!!drink.strMeasure9 && { strMeasure9: drink.strMeasure9 }),
          ...(!!drink.strImageSource && { strImageSource: drink.strImageSource })
        };
      });
    }

    return results as ISearchResult[];
  }
}
