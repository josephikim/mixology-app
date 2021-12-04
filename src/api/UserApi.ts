import { IBottle, AddBottleResult } from '../types';
import * as ApiHelper from '../utils/apiHelper';
import axios from 'axios';
import settings from './settings';
import { authJwt } from '../middleware';

const userApiClient = axios.create({
  baseURL: settings.apiTestUrl,
  headers: ApiHelper.createHeaders()
});

export class UserApi {
  async addBottle(bottle: IBottle): Promise<AddBottleResult> {
    const url = 'localhost:8080/api';

    const body = { ...bottle };

    const response: AddBottleResult = await axios.post(url, body);

    return response;
  }
}
