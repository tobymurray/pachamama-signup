exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('subscriptions', (table) => {
    table.increments('subscription_id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user_id').inTable('users');
    table.integer('subscription_type_id').unsigned();
    table.foreign('subscription_type_id').references('subscription_type_id').inTable('subscription_types');
    table.integer('pick_up_location_id').unsigned();
    table.foreign('pick_up_location_id').references('pick_up_location_id').inTable('pick_up_locations');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();

    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('subscriptions');
};
