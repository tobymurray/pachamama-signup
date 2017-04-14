import express from 'express';
const router = express.Router();

router.get('/user/isSignedIn', function (req, res, next) {
  if (!req.user) {
    return res.json({ 'isSignedIn': false });
  }

  return res.json({ 'isSignedIn': true });
});

export { router };
