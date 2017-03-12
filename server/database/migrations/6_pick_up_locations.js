exports.up = function(knex, Promise) {
   return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('pick_up_locations', (table) => {
    table.increments('pick_up_location_id');
    table.string("description");
    table.integer('address_id').unsigned();
    table.foreign('address_id').references('address_id').inTable('addresses');
    
    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('pick_up_locations');
};
