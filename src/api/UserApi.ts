import { LoginModel, Bottle } from '../models';
import * as ApiHelper from '../utils/ApiHelper';
import axios from 'axios';
import settings from '../models/Settings';
import { TokenResult, CreateBottleResult } from '../models/ResultTypes';

export class UserApi {
  async login(model: LoginModel): Promise<TokenResult> {
    const url: string = settings.authBaseUrl;

    const headers = await ApiHelper.createHeaders();

    const body = { email: model.email, password: model.password };

    const response: TokenResult = await axios.post(url, body, {
      headers: headers
    });

    return response;
  }

  async createBottle(bottle: Bottle): Promise<CreateBottleResult> {
    const url = 'localhost:8080/api';

    const body = { ...bottle };

    const response: CreateBottleResult = await axios.post(url, body);

    return response;
  }
}
