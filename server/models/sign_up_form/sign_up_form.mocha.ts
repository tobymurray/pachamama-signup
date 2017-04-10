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
  it("returns a single user's subsription", function () {
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
        return (<any>global).knex('users').max('user_id');
      }).then((result) => {
        return (<any>global).knex.raw('select * from user_subscription(' + result[0].max + ')');
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

  it("returns all users subscriptions", function () {

    let secondSubscription: SignUpFormData = {
      firstName: 'firstName2',
      lastName: 'lastName2',
      phone: 'phone2',
      email: 'email2',
      password: 'password2',
      addressOne: 'addressOne2',
      addressTwo: 'addressTwo2',
      city: 'city2',
      postalCode: 'postalCode2',
      province: 'province2',
      country: 'country2',
      shareSize: 'halfShare',
      pickUpLocation: 'Moo Shu Ice Cream'
    };

    let signUpForm = new SignUpForm();

    return signUpForm.submit(secondSubscription)
      .then((result) => {
        return SignUpForm.getSubscriptions();
      }).then(results => {
        assert.equal(results.rows.length, 2);
      });
  });
});
