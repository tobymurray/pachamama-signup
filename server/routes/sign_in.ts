import express from 'express';
const router = express.Router();

import { SignInForm } from './../models/sign_in_form/sign_in_form';
import { SignInFormData } from '../models/sign_in_form/sign_in_form_data'

router.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let form: SignInFormData = req.body;

  new SignInForm().submit(form).then((user) => {
    console.log("Result is: ");
    console.log(user);
    res.send(JSON.stringify({ message: "success" }));
  }).catch(error => {
    console.error(error);
    res.send(JSON.stringify({ error: error }));
  })

});

export { router };
