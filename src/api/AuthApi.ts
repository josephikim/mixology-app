import axios from 'axios';

import settings from './Settings';
import * as ApiHelper from '../utils/ApiHelper';
import { IRegistration, ILogin, ILoginResult, TokenResult } from '../types';

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

  async loginUser(credentials: ILogin): Promise<ILoginResult> {
    const body = { username: credentials.username, password: credentials.password };
    const url = `${authApiClient.defaults.baseURL}/login`;

    const response = await authApiClient.post(url, body);

    const token = {
      statusCode: response.status,
      message: response.statusText,
      data: [response.data.loginData]
    };

    const result = {
      token,
      drinks: response.data.drinkData
    };

    return result as ILoginResult;
  }
}
