import axios from 'axios';

import store from '../store/index';
import { accessTokenUpdated, logout } from '../store/authSlice';
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
          const rs = await userApiClient.post('/auth/refreshtoken', {
            refreshToken: StorageHelper.getLocalRefreshToken()
          });

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

      if (err.response.status === 403 || err.response.status === 401) {
        store.dispatch(logout());

        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export class UserApi {
  async getSearchResults(query: string): Promise<[SearchResult] | null> {
    const url = `${userApiClient.defaults.baseURL}/search/${query}`;
    const response = await userApiClient.get(url);
    let searchResults = null;

    if (response.data.length > 0) {
      searchResults = response.data.map((drink) => {
        const result = {
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
        return result;
      });
    }
    return searchResults;
  }
}
