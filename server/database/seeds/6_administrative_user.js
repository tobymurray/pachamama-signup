const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(function () {
      return bcrypt.hash('not-password', 4);
    }).then(function (encrypted_password) {
      return knex('users').insert([{
        first_name: 'admin',
        last_name: 'admin',
        phone_number: '613-858-4798',
        email: 'murray.toby@gmail.com',
        password: encrypted_password
      }]).max('user_id').then(max => {
        return knex.raw('ALTER SEQUENCE users_user_id_seq START WITH ' + (max.rowCount + 1));
      }).then(() => {
        return knex.raw('ALTER SEQUENCE users_user_id_seq RESTART');
      });;
    });
};

