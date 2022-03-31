import axios from 'axios';

import store from '../store/index';
import { accessTokenUpdated } from '../store/authSlice';
import { SearchResult } from '../types';
import { StorageHelper } from '../utils/storageHelper';
import * as ApiHelper from '../utils/apiHelper';
import settings from './settings';

const userApiClient = axios.create({
  baseURL: settings.baseUrl,
  headers: ApiHelper.createHeaders()
});

userApiClient.interceptors.request.use(
  async (config) => {
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
          const rs = await StorageHelper.refreshToken(userApiClient);
          const { accessToken } = rs.data;

          userApiClient.defaults.headers.common['x-access-token'] = accessToken;

          // authorize user
          store.dispatch(accessTokenUpdated(accessToken));

          return userApiClient(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export class UserApi {
  async getSearchResults(query: string): Promise<[SearchResult]> {
    const url = `${userApiClient.defaults.baseURL}/search/${query}`;

    try {
      const response = await userApiClient.get(url);

      const searchResults = response.data.map((drink) => {
        const result = {
          drinkId: drink.idDrink,
          drinkName: drink.strDrink,
          drinkTags: drink.strTags,
          drinkGlass: drink.strGlass,
          drinkInstructions: drink.strInstructions,
          drinkThumbSrc: drink.strDrinkThumb,
          drinkIngredient1: drink.strIngredient1,
          drinkIngredient2: drink.strIngredient2,
          drinkIngredient3: drink.strIngredient3,
          drinkIngredient4: drink.strIngredient4,
          drinkIngredient5: drink.strIngredient5,
          drinkIngredient6: drink.strIngredient6,
          drinkIngredient7: drink.strIngredient7,
          drinkIngredient8: drink.strIngredient8,
          drinkIngredient9: drink.strIngredient9,
          drinkIngredient10: drink.strIngredient10,
          drinkIngredient11: drink.strIngredient11,
          drinkIngredient12: drink.strIngredient12,
          drinkIngredient13: drink.strIngredient13,
          drinkIngredient14: drink.strIngredient14,
          drinkIngredient15: drink.strIngredient15,
          drinkMeasure1: drink.strMeasure1,
          drinkMeasure2: drink.strMeasure2,
          drinkMeasure3: drink.strMeasure3,
          drinkMeasure4: drink.strMeasure4,
          drinkMeasure5: drink.strMeasure5,
          drinkMeasure6: drink.strMeasure6,
          drinkMeasure7: drink.strMeasure7,
          drinkMeasure8: drink.strMeasure8,
          drinkMeasure9: drink.strMeasure9,
          drinkMeasure10: drink.strMeasure10,
          drinkMeasure11: drink.strMeasure11,
          drinkMeasure12: drink.strMeasure12,
          drinkMeasure13: drink.strMeasure13,
          drinkMeasure14: drink.strMeasure14,
          drinkMeasure15: drink.strMeasure15,
          drinkImgSrc: drink.strImageSource
        };
        return result;
      });
      return searchResults;
    } catch (err) {
      return Promise.resolve(err);
    }
  }
}
