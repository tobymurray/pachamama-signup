import express from 'express';
var submit = express.Router();

submit.post('/', function (req, res, next) {
  console.log(req.body);
  res.send('respond with a resource');
});

export { submit };
