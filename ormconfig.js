/* eslint-disable @typescript-eslint/no-var-requires */
const config =
  process.env.NODE_ENV === 'production'
    ? require('./dist/config').default
    : require('./src/config').default;

const srcConfig = {
  type: 'mysql',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: ['src/api/entities/*.ts'],
  migrations: ['migration/*.js'],
  cli: {
    entitiesDir: 'src/api/entities',
    migrationsDir: 'migration',
  },
};

const distConfig = {
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: false,
  logging: false,
  entities: ['dist/api/entities/**/*.js'],
  cli: {
    entitiesDir: 'dist/api/entities',
  },
};

module.exports = process.env.NODE_ENV === 'production' ? distConfig : srcConfig;
