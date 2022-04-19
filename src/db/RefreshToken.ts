import { Schema, Model, Document, model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { jwtRefreshExpiration } from '../config/authConfig';
export interface IRefreshTokenDoc extends Document {
  token: string;
  user: Types.ObjectId;
  expiryDate: Date;
}

interface IRefreshTokenModel extends Model<IRefreshTokenDoc> {
  createToken(user: Types.ObjectId): string;
  verifyExpiration(token: IRefreshTokenDoc): boolean;
}

const refreshTokenSchema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expiryDate: Date
});

refreshTokenSchema.statics.createToken = async function (user: Types.ObjectId): Promise<string> {
  const expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + parseInt(jwtRefreshExpiration));

  const _token = uuidv4();

  const _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime()
  }) as IRefreshTokenDoc;

  const refreshToken = await _object.save();

  return refreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token): boolean => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = model<IRefreshTokenDoc, IRefreshTokenModel>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
