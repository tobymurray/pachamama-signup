import express from 'express';
var submit = express.Router();

submit.post('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ message: "success" }));
  console.log(req.body);
});

export { submit };
