import { IRegistration, ILogin, TokenResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import axios from 'axios';
import settings from './settings';

const authApiClient = axios.create({
  baseURL: settings.authUrl,
  headers: ApiHelper.createHeaders()
});

export class AuthApi {
  async registerUser(registration: IRegistration): Promise<TokenResult> {
    const body = { username: registration.username, password: registration.password };
    const url = `${authApiClient.defaults.baseURL}/register`;
    const response = await axios.post(url, body);
    const tokenData = response.data;
    const tokenResult = {
      statusCode: response.status,
      message: response.statusText,
      data: [tokenData]
    };
    return tokenResult as TokenResult;
  }

  async loginUser(credentials: ILogin): Promise<TokenResult> {
    const body = { username: credentials.username, password: credentials.password };

    const response: TokenResult = await axios.post(`${authApiClient.defaults.baseURL}/login`, body);

    return response;
  }
}
