import { PickUpLocation } from './../pick_up_location';
import { SubscriptionType } from './../subscription_types/subscription_type';
import { Subscription } from './../subscription';
var assert = require('assert');
var expect = require('chai').expect

import { Address } from './../address';
import { Database } from '../../database/db_config';
import { SignUpForm } from './sign_up_form';
import { User } from './../users/user';
import { SignUpFormData } from './sign_up_form_data';

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
        return User.get(form.email)
      }).then(user => {
        console.log(user);
        return Promise.all([
          Address.getForUser(user.id),
          Subscription.getForUser(user.id)
        ]);
      }).then(([addresses, subscriptions]) => {
        console.log(addresses);
        console.log(subscriptions);
        if (subscriptions.length == 0) {
          return null;
        }

        return Promise.all([
          PickUpLocation.getById(subscriptions[0].pickUpLocationId),
          SubscriptionType.getById(subscriptions[0].subscriptionTypeId)
        ])
          .then(([pickUpLocation, subscriptionType]) => {
            console.log(pickUpLocation);
            console.log(subscriptionType);
          });
      });
  });
});
