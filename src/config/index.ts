import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

let databaseHost = process.env.MYSQL_HOST;
if (process.env.NODE_ENV === 'test') {
  databaseHost = process.env.MYSQL_HOST;
}

export default {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL,
  },
  endpointPrefix: process.env.ENDPOINT_PREFIX || 'api',
};
