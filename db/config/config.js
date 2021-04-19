const { env } = require('process');
module.exports = {
  development: {
    username: 'postgres',
    password: env.DB_HEROES_PASS || 'postgres',
    database: 'superheroes',
    host: '127.0.0.1',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {},
  production: {},
};
