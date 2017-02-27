exports.seed = function (knex, Promise) {
  return knex('roles').del()
    .then(function () {
      return knex('roles').insert([{
          role_name: 'admin',
          description: 'All privileges'
        },
        {
          role_name: 'user',
          description: 'No privileges'
        },
      ]);
    });
};