import { IBottle, AddBottleResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import axios from 'axios';
import settings from './settings';

const userApiClient = axios.create({
  baseURL: settings.baseUrl,
  headers: ApiHelper.createHeaders()
});

export class UserApi {
  async addBottle(bottle: IBottle): Promise<AddBottleResult> {
    const url = `${userApiClient.defaults.baseURL}/user/bottle`;
    const body = { ...bottle };
    const response: AddBottleResult = await userApiClient.post(url, body);

    return response;
  }
}
