import express from 'express';
const submit = express.Router();

import { User } from '../models/users/user';
import { Address } from '../models/address';
import { Subscription } from '../models/subscription';
import { SubscriptionType } from '../models/subscription_type';
import { PickUpLocation } from '../models/pick_up_location';

submit.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let form = req.body;

  Promise.all([
    User.add(form['firstName'], form['lastName'], form['phone'], form['email'], form['password']),
    Address.add(form['addressOne'], form['addressTwo'], '', form['city'], form['postalCode'], form['province'], form['country']),
    form['halfShare'] == 'halfShare' ? SubscriptionType.getHalfShare() : SubscriptionType.getFullShare(),
    PickUpLocation.get(form['pickUpLocation'])
  ]).then(([user, address, subscriptionType, pickUpLocation]) => {
    let now = new Date();
    return Promise.all([
      user.addAddress(address),
      Subscription.add(user.id, subscriptionType.id, pickUpLocation.id, now, now)
    ]);
  }).then(() => {
    res.send(JSON.stringify({ message: "success" }));
  }).catch(error => {
    console.error(error);
    res.send(JSON.stringify({ error: error }));
  })

});

export { submit };
