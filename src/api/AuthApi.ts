import { IRegistration, ILoginCredentials, TokenResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import axios from 'axios';
import settings from './settings';

const authApiClient = axios.create({
  baseURL: settings.apiAuthUrl,
  headers: ApiHelper.createHeaders()
});

export class AuthApi {
  async registerUser(registration: IRegistration): Promise<TokenResult> {
    const body = { email: registration.email, password: registration.password };

    const response: TokenResult = await axios.post(`${authApiClient.defaults.baseURL}/register`, body);

    return response;
  }

  async loginUser(credentials: ILoginCredentials): Promise<TokenResult> {
    const body = { email: credentials.email, password: credentials.password };

    const response: TokenResult = await axios.post(`${authApiClient.defaults.baseURL}/login`, body);

    return response;
  }
}
