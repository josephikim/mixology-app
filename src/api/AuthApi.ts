import { IRegistration, ILoginCredentials, TokenResult } from '../types';
import * as ApiHelper from '../utils/ApiHelper';
import axios from 'axios';
import { Service } from 'axios-middleware';
import settings from './Settings';
import { verifyRegistration } from '../middleware';
import authController from '../controllers/auth.controller';

const authApiHttp = axios.create({
  baseURL: settings.apiAuthUrl,
  headers: ApiHelper.createHeaders()
});

const authApiService = new Service(authApiHttp);

// register middleware for axios-middleware service
authApiService.register({
  onSync(promise) {
    verifyRegistration.checkDuplicateUsername, verifyRegistration.checkRolesExist;
    return promise;
  },
  onResponse(response) {
    authController.register, authController.login;
    return response;
  }
});

export class AuthApi {
  // register user
  async registerUser(registration: IRegistration): Promise<TokenResult> {
    const body = { email: registration.email, password: registration.password };

    console.log('authApiHttp.defaults.baseURL', authApiHttp.defaults.baseURL);
    const response: TokenResult = await axios.post(`${authApiHttp.defaults.baseURL}/register`, body);
    console.log('response', response);

    return response;
  }

  async login(credentials: ILoginCredentials): Promise<TokenResult> {
    const body = { email: credentials.email, password: credentials.password };

    const response: TokenResult = await axios.post(`${authApiHttp.defaults.baseURL}/login`, body);
    console.log('response', response);
    return response;
  }
}
