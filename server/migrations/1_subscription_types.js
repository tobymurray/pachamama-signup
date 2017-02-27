exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('subscription_types', (table) => {
    table.increments('subscription_type_id');
    table.string('description').notNullable();
    
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('subscription_types');
};
