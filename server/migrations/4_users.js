exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id');
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone_number").notNullable();
    table.specificType('email', 'citext').unique().notNullable();
    table.string('password').notNullable();

    table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};


// {
//   shareSize: 'halfShare',
//   pickUpLocation: 'Moo Shu Ice Cream',
// }