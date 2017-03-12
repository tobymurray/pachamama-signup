const TABLE = 'pick_up_locations';

exports.seed = function (knex, Promise) {
  return knex(TABLE).del()
    .then(function () {
      let now = new Date();
      return knex(TABLE).insert([{
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
      ]).then(() => {
        if (process.env.NODE_ENV === 'test') {
          return;
        }
        return max('pick_up_location_id')
          .then(max => {
            knex.raw('ALTER SEQUENCE pick_up_locations_pick_up_location_id_seq START WITH ' + (max.rowCount + 1));
          }).then(() => {
            return knex.raw('ALTER SEQUENCE pick_up_locations_pick_up_location_id_seq RESTART');
          });
      });
    });
};