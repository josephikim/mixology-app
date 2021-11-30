import mongoose from 'mongoose';
import Role from './Role';
import User from './User';

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: User,
  role: Role,
  roles: ['user', 'admin', 'moderator']
};

export default db;
