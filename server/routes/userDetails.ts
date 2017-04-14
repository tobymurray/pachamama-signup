import express from 'express';
const router = express.Router();

router.get('/users/:userId', function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ 'error': "You must be logged in to access profile information" });
  }

  if (req.params.userId != req.user.id) {
    return res.status(401).json({ 'error': "Unauthorized" });
  }

  return res.json({ 'message': 'All the data!' });
});

export { router };
