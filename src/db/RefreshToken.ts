import { Schema, Model, model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { jwtRefreshExpiration } from '../config/authConfig';

export interface IRefreshToken {
  token: string;
  user: Types.ObjectId;
  expiryDate: Date;
}

export interface IRefreshTokenModel extends Model<IRefreshToken> {
  createToken(user: Types.ObjectId): string;
  verifyExpiration(token: IRefreshToken): boolean;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expiryDate: Date
});

refreshTokenSchema.statics.createToken = async function (user: Types.ObjectId): Promise<string> {
  const expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + parseInt(jwtRefreshExpiration ? jwtRefreshExpiration : '86400'));

  const _token = uuidv4();

  const _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime()
  });

  const refreshToken = await _object.save();

  return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token): boolean => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = model<IRefreshToken, IRefreshTokenModel>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
