import connection from './connection';
import User from './User';
import Role from './Role';
import RefreshToken from './RefreshToken';

const db = {
  connection,
  user: User,
  role: Role,
  event: Event,
  refreshToken: RefreshToken,
  roles: ['user', 'admin', 'moderator']
};

export default db;
