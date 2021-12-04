import connection from './connection';
import User from './User';
import Role from './Role';

const db = {
  connection,
  user: User,
  role: Role,
  event: Event,
  roles: ['user', 'admin', 'moderator']
};

export default db;
