const jwtSecretKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : '';
const jwtExpiration = process.env.JWT_EXPIRATION ? process.env.JWT_EXPIRATION : '3600';
const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION ? process.env.JWT_REFRESH_EXPIRATION : '86400';

export { jwtSecretKey, jwtExpiration, jwtRefreshExpiration };
