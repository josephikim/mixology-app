const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiration = process.env.JWT_EXPIRATION;
const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION;

export { jwtSecretKey, jwtExpiration, jwtRefreshExpiration };
