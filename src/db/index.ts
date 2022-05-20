import connection from './connection';
import User from './User';
import Role from './Role';
import RefreshToken from './RefreshToken';
import Drink from './Drink';
import Keyword from './Keyword';
import UserCollectionItem from './UserCollectionItem';

const db = {
  connection,
  user: User,
  role: Role,
  event: Event,
  refreshToken: RefreshToken,
  drink: Drink,
  keyword: Keyword,
  userCollectionItem: UserCollectionItem,
  roles: ['user', 'admin', 'moderator']
};

export default db;
