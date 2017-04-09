exports.seed = function (knex, Promise) {
  return knex.raw('DROP FUNCTION IF EXISTS user_subscription(int)')
    .then(() => {
      return knex.raw(`
CREATE OR REPLACE FUNCTION user_subscription(user_id integer) 
  RETURNS TABLE(
    first_name text,
    last_name text,
    phone_number text,
    email text,
    customer_line_1 text,
    customer_line_2 text,
    customer_line_3 text,
    customer_city text,
    customer_postal_code text,
    customer_province text,
    customer_country text,
    subscription_type text,
    pick_up_location text,
    pick_up_line_1 text,
    pick_up_line_2 text,
    pick_up_line_3 text,
    pick_up_city text,
    pick_up_postal_code text,
    pick_up_province text,
    pick_up_country text
  ) as $$
SELECT
  users.first_name,
  users.last_name,
  users.phone_number,
  users.email,
  customer_address.line_1,
  customer_address.line_2,
  customer_address.line_3,
  customer_address.city,
  customer_address.postal_code,
  customer_address.province,
  customer_address.country,
  subscription_types.description,
  pick_up_locations.description,
  pick_up_address.line_1,
  pick_up_address.line_2,
  pick_up_address.line_3,
  pick_up_address.city,
  pick_up_address.postal_code,
  pick_up_address.province,
  pick_up_address.country
FROM users
  JOIN customers_addresses
    ON customers_addresses.user_id = users.user_id
  JOIN addresses AS customer_address
    ON customer_address.address_id = customers_addresses.address_id
  JOIN subscriptions
    ON subscriptions.user_id = users.user_id
  JOIN pick_up_locations
    ON pick_up_locations.pick_up_location_id = subscriptions.pick_up_location_id
  JOIN addresses AS pick_up_address
    ON pick_up_address.address_id = pick_up_locations.address_id
  JOIN subscription_types
    ON subscription_types.subscription_type_id = subscriptions.subscription_type_id
WHERE
  users.user_id = $1
;
$$ LANGUAGE SQL;
`)
    });
};