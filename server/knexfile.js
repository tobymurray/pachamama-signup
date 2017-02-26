require('dotenv').config();

module.exports = {

  development: {
    searchPath: process.env.DB_SCHEMA_NAME || process.env.DB_NAME,
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME + "_development",
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASSWORD
    }
  },

  test: {
    searchPath: process.env.DB_SCHEMA_NAME || process.env.DB_NAME,
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME + "_test",
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    searchPath: process.env.DB_SCHEMA_NAME || process.env.DB_NAME,
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME + "_production",
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};