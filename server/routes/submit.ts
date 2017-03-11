import express from 'express';
const router = express.Router();

import { SignUpForm } from './../models/sign_up_form/sign_up_form';
import { SignUpFormData } from '../models/sign_up_form/sign_up_form_data'

router.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let form: SignUpFormData = req.body;

  new SignUpForm().submit(form).then(() => {
    res.send(JSON.stringify({ message: "success" }));
  }).catch(error => {
    console.error(error);
    res.send(JSON.stringify({ error: error }));
  })

});

export { router };
