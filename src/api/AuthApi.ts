import axios from 'axios';
import { response } from 'express';

import { IRegistration, ILogin, TokenResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import { StorageHelper } from '../utils';
import settings from './settings';

const authApiClient = axios.create({
  baseURL: settings.authUrl,
  headers: ApiHelper.createHeaders()
});

export class AuthApi {
  async registerUser(registration: IRegistration): Promise<TokenResult> {
    const body = { username: registration.username, password: registration.password };
    const url = `${authApiClient.defaults.baseURL}/register`;

    const response = await authApiClient.post(url, body);

    const tokenResult = {
      statusCode: response.status,
      message: response.statusText,
      data: [response.data]
    };

    return tokenResult as TokenResult;
  }

  async loginUser(credentials: ILogin): Promise<TokenResult> {
    const body = { username: credentials.username, password: credentials.password };
    const url = `${authApiClient.defaults.baseURL}/login`;

    const response = await authApiClient.post(url, body);

    const tokenResult = {
      statusCode: response.status,
      message: response.statusText,
      data: [response.data]
    };

    return tokenResult as TokenResult;
  }

  async logoutUser(): Promise<void> {
    localStorage.removeItem('state');
  }
}
