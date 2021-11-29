import mongoose from 'mongoose';
import Role from './Role';
import User from './User';

export const db = {
  mongoose,
  user: User,
  role: Role,
  roles: ['user', 'admin', 'moderator']
};
