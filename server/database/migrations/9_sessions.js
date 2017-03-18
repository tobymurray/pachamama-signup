exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('sessions', (table) => {
    table.string('session_id').primary();
    table.json('sess').notNullable();
    table.timestamp('expired').notNullable().index();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('sessions');
};
