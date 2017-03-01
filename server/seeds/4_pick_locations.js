exports.seed = function (knex, Promise) {
  return knex('pick_up_locations').del()
    .then(function () {
      let now = new Date();
      return knex('pick_up_locations').insert([{
          address_id: 1,
          description: 'Moo Shu Ice Cream',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 2,
          description: 'Orleans',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 3,
          description: 'RA Center',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 4,
          description: 'Kanata',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 5,
          description: 'Pachamama Farm',
          created_at: now,
          updated_at: now
        },
      ]);
    });
};