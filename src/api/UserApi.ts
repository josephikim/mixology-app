import { ILoginCredentials, IBottle, TokenResult, AddBottleResult } from '../types';
import * as ApiHelper from '../utils/ApiHelper';
import axios from 'axios';
import settings from './Settings';

export class UserApi {
  async login(credentials: ILoginCredentials): Promise<TokenResult> {
    const url: string = settings.authBaseUrl;

    const headers = await ApiHelper.createHeaders();

    const body = { email: credentials.email, password: credentials.password };

    const response: TokenResult = await axios.post(url, body, {
      headers: headers
    });

    return response;
  }

  async addBottle(bottle: IBottle): Promise<AddBottleResult> {
    const url = 'localhost:8080/api';

    const body = { ...bottle };

    const response: AddBottleResult = await axios.post(url, body);

    return response;
  }
}
