const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiration = process.env.JWT_EXPIRATION;

export default {
  jwtSecretKey,
  jwtExpiration
};
