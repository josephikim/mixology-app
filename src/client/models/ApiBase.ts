import { ITokenModel, IBottle } from '.';

export interface IApiResultBase {
  statusCode: number;
  message: string;
  success: boolean;
  errorCode: string;
}

export interface IApiResultBaseOf<T extends ITokenModel | IBottle> extends IApiResultBase {
  data: T[];
}
