exports.seed = function (knex, Promise) {
  return knex('subscription_types').del()
    .then(function () {
      let now = new Date();
      return knex('subscription_types').insert([{
          description: "Full share",
          created_at: now,
          updated_at: now
        },
        {
          description: "Half share",
          created_at: now,
          updated_at: now
        }
      ]);
    });
};