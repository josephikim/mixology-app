import { IBottle, AddBottleResult } from '../types';
import axios from 'axios';

export class UserApi {
  async addBottle(bottle: IBottle): Promise<AddBottleResult> {
    const url = 'localhost:8080/api';

    const body = { ...bottle };

    const response: AddBottleResult = await axios.post(url, body);

    return response;
  }
}
