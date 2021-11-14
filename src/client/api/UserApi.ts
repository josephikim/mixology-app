import { ILoginModel, IBottle } from '../models';
import * as ApiHelper from '../utils/ApiHelper';
import axios from 'axios';
import settings from '../models/Settings';
import { TokenResult, AddBottleResult } from '../models/ResultTypes';

export class UserApi {
  async login(model: ILoginModel): Promise<TokenResult> {
    const url: string = settings.authBaseUrl;

    const headers = await ApiHelper.createHeaders();

    const body = { email: model.email, password: model.password };

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
