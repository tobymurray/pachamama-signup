exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('roles', (table) => {
    table.increments('role_id');
    table.specificType('role_name', 'citext').unique().notNullable();
    table.string('description').notNullable();

    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('roles');
};