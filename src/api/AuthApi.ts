import { IRegistration, ILogin, TokenResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import axios from 'axios';
import settings from './settings';

const authApiClient = axios.create({
  baseURL: settings.apiAuthUrl,
  headers: ApiHelper.createHeaders()
});

export class AuthApi {
  async registerUser(registration: IRegistration): Promise<TokenResult> {
    const body = { username: registration.username, password: registration.password };

    const response: TokenResult = await axios.post(`${authApiClient.defaults.baseURL}/register`, body);
    console.log('response', response);
    return response;
  }

  async loginUser(credentials: ILogin): Promise<TokenResult> {
    const body = { username: credentials.username, password: credentials.password };

    const response: TokenResult = await axios.post(`${authApiClient.defaults.baseURL}/login`, body);

    return response;
  }
}
