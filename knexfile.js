// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_2_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://doxhgahmyvigzj:25879c1c06b4af8b4a3a2dc38731c411fc85b93b33ffa98cd42e44e359089375@ec2-54-235-250-38.compute-1.amazonaws.com:5432/damfpjaji1dsnb',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
