import { Schema, Document, model } from 'mongoose';
import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { IRoleDoc } from './Role';

const SALT_WORK_FACTOR = 10;

export interface IUserDoc extends Document {
  username: string;
  password: string;
  roles: IRoleDoc[];
  validatePassword(candidatePassword: string): boolean;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Enter a username.'],
      unique: [true, 'That username is taken.']
    },
    password: {
      type: String,
      required: [true, 'Enter a password.'],
      minLength: [4, 'Password should be at least four characters']
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  },
  { emitIndexErrors: true }
);

// preserving isNew state for 'post' middleware
userSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

// schema middleware to apply before saving
userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (err) {
    return next(err);
  }
});

// schema middleware to apply after saving
const handleE11000 = (error: any, next: NextFunction): void => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error.'));
  } else {
    next();
  }
};

userSchema.post('save', handleE11000);
userSchema.post('findOneAndUpdate', handleE11000);

userSchema.methods.validatePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUserDoc>('User', userSchema);

export default User;
