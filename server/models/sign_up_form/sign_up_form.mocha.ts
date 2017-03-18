var assert = require('assert');
var expect = require('chai').expect

import { Database } from '../../database/db_config';
import { SignUpForm } from './sign_up_form';
import { SignUpFormData } from './sign_up_form_data';
import { UserSubscriptionData } from './user_subscription_data';

if (!(<any>global).knex) {
  (<any>global).knex = Database.get();
}

describe('SignUpForm', function () {
  it('do', function () {
    let form: SignUpFormData = {
      firstName: 'firstName',
      lastName: 'lastName',
      phone: 'phone',
      email: 'email',
      password: 'password',
      addressOne: 'addressOne',
      addressTwo: 'addressTwo',
      city: 'city',
      postalCode: 'postalCode',
      province: 'province',
      country: 'country',
      shareSize: 'halfShare',
      pickUpLocation: 'Moo Shu Ice Cream'
    };

    let signUpForm = new SignUpForm();

    return signUpForm.submit(form)
      .then(() => {
        return (<any>global).knex.raw('select * from user_subscription(1)');
      }).then(results => {
        let userSubscriptionData: UserSubscriptionData = results.rows[0];
        assert.equal(userSubscriptionData.first_name, form.firstName);
        assert.equal(userSubscriptionData.last_name, form.lastName);
        assert.equal(userSubscriptionData.phone_number, form.phone);
        assert.equal(userSubscriptionData.email, form.email);
        assert.equal(userSubscriptionData.customer_line_1, form.addressOne);
        assert.equal(userSubscriptionData.customer_line_2, form.addressTwo);
        assert.equal(userSubscriptionData.customer_line_3, "");
        assert.equal(userSubscriptionData.customer_city, form.city);
        assert.equal(userSubscriptionData.customer_postal_code, form.postalCode);
        assert.equal(userSubscriptionData.customer_province, form.province);
        assert.equal(userSubscriptionData.customer_country, form.country);
        assert.equal(userSubscriptionData.subscription_type, 'Half share');
        assert.equal(userSubscriptionData.pick_up_location, form.pickUpLocation);
        assert.equal(userSubscriptionData.pick_up_line_1, "477 Bank St");
        assert.equal(userSubscriptionData.pick_up_line_2, "");
        assert.equal(userSubscriptionData.pick_up_line_3, "Moo Shu Ice Cream");
        assert.equal(userSubscriptionData.pick_up_city, "Ottawa");
        assert.equal(userSubscriptionData.pick_up_postal_code, "K2P 1Z2");
        assert.equal(userSubscriptionData.pick_up_province, "Ontario");
        assert.equal(userSubscriptionData.pick_up_country, "Canada");
      });
  });
});
