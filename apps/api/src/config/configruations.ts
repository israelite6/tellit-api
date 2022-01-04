export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  salt: parseInt(process.env.SALT_OR_ROUNDS),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  database:
    'postgresql://dunamis:dunamis@167.99.93.162:5400/tellit-api?schema=public',
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT),
});
