require('dotenv').config({
  path: '../.env'
});

module.exports = {

  development: {
    client: 'postgres',
    searchPath: process.env.DB_SCHEMA_NAME || process.env.DB_NAME,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME + "_development",
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASSWORD
    },
    pool: {
      max: process.env.DB_NUM_MAX_CLIENTS,
      idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: "./pachamama_test.sqlite"
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgres',
    searchPath: process.env.DB_SCHEMA_NAME || process.env.DB_NAME,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME + "_production",
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASSWORD
    },
    pool: {
      max: process.env.DB_NUM_MAX_CLIENTS,
      idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
    }
  }

};