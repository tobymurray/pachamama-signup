import Knex from "knex";

export class Database {

  private static knex: Knex;

  public static get(): Knex {
    if (Database.knex) return Database.knex;

    Database.knex = Knex(
      {
        client: 'pg',
        connection: {
          user: process.env.DB_USER,
          database: process.env.DB_NAME + "_" + process.env.NODE_ENV,
          password: process.env.DB_PASSWORD,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
        }, pool: {
          max: process.env.DB_NUM_MAX_CLIENTS,
          idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS,
        }
      });

    return Database.knex;
  }
} 