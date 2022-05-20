import axios from 'axios';

import settings from './Settings';
import * as ApiHelper from '../utils/ApiHelper';
import { IRegistration, ILogin, ILoginResult } from '../types';

const authApiClient = axios.create({
  baseURL: settings.authUrl,
  headers: ApiHelper.createHeaders()
});

export class AuthApi {
  async registerUser(registration: IRegistration): Promise<ILoginResult> {
    const body = { username: registration.username, password: registration.password };
    const url = `${authApiClient.defaults.baseURL}/register`;

    const response = await authApiClient.post(url, body);

    return response.data as ILoginResult;
  }

  async loginUser(credentials: ILogin): Promise<ILoginResult> {
    const body = { username: credentials.username, password: credentials.password };
    const url = `${authApiClient.defaults.baseURL}/login`;

    const response = await authApiClient.post(url, body);

    return response.data as ILoginResult;
  }
}
