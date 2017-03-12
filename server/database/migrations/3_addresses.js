exports.up = function(knex, Promise) {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('addresses', (table) => {
    table.increments('address_id');
    table.string("line_1").notNullable();
    table.string("line_2");
    table.string("line_3");
    table.string("city").notNullable();;
    table.string("postal_code").notNullable();
    table.string("province").notNullable();
    table.string("country").notNullable();

    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('addresses');
};
