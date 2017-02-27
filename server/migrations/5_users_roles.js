exports.up = (knex, Promise) => {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).createTable('users_roles', (table) => {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user_id').inTable('users');
    table.integer('role_id').unsigned();
    table.foreign('role_id').references('role_id').inTable('roles');
    table.primary(['user_id', 'role_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema(process.env.DB_SCHEMA_NAME).dropTable('users_roles');
};