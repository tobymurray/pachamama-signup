import express from 'express';
const submit = express.Router();

import { User } from '../models/user';
import { Address } from '../models/address';

submit.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let form = req.body;

  Promise.all([
    User.add(form['firstName'], form['lastName'], form['phone'], form['email'], form['password']),
    Address.add(form['addressOne'], form['addressTwo'], '', form['city'], form['postalCode'], form['province'], form['country'])
  ]).then(([user, address]) => {
    return user.addAddress(address);
  }).then(() => {
    res.send(JSON.stringify({ message: "success" }));
  }).catch(error => {
    console.error(error);
    res.send(JSON.stringify({ error: error }));
  })

});

export { submit };
