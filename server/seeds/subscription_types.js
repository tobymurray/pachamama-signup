exports.seed = function (knex, Promise) {
  return knex('subscription_types').del()
    .then(function () {
      return knex('subscription_types').insert([{
          description: "Full share"
        },
        {
          description: "Half share"
        }
      ]);
    });
};