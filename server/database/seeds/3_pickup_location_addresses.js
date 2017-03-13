const TABLE = 'addresses';

exports.seed = function (knex, Promise) {
  return knex(TABLE).del()
    .then(function () {
      let now = new Date();
      return knex(TABLE).insert([{
          address_id: 1,
          line_1: '477 Bank St',
          line_2: '',
          line_3: 'Moo Shu Ice Cream',
          city: 'Ottawa',
          postal_code: 'K2P 1Z2',
          province: 'Ontario',
          country: 'Canada',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 2,
          line_1: '123 Sample St.',
          line_2: '',
          line_3: 'Orleans',
          city: 'Orleans',
          postal_code: 'K1K 1K1',
          province: 'Ontario',
          country: 'Canada',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 3,
          line_1: '2451 Riverside Dr.',
          line_2: '',
          line_3: 'RA Center',
          city: 'Ottawa',
          postal_code: 'K1H 7X7',
          province: 'Ontario',
          country: 'Canada',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 4,
          line_1: '123 Sample St.',
          line_2: '',
          line_3: 'Kanata',
          city: 'Kanata',
          postal_code: 'K1K 1K1',
          province: 'Ontario',
          country: 'Canada',
          created_at: now,
          updated_at: now
        },
        {
          address_id: 5,
          line_1: '6810 Dwyer Hill Rd.',
          line_2: '',
          line_3: 'Pachamama Farm!',
          city: "Smith's Falls",
          postal_code: 'K7A 4S6',
          province: 'Ontario',
          country: 'Canada',
          created_at: now,
          updated_at: now
        },
      ]).max('address_id').then(max => { 
        return knex.raw('ALTER SEQUENCE addresses_address_id_seq START WITH ' + (max.rowCount + 1)); 
      }).then(() => { 
        return knex.raw('ALTER SEQUENCE addresses_address_id_seq RESTART'); 
      });
    });
};