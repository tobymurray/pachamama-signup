exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('customers_addresses', (table) => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user_id').inTable('users');
    table.integer('address_id').unsigned();
    table.foreign('address_id').references('address_id').inTable('addresses');
    table.primary(['user_id', 'address_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('customers_addresses');
};