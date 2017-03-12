import Knex from "knex";
import knexfile from './knexfile';

export class Database {

  private static knex: Knex;

  public static get(): Knex {
    if (Database.knex) return Database.knex;

    Database.knex = Knex(knexfile[process.env.NODE_ENV]);

    return Database.knex;
  }
} 