const express = require('express');

const router = express.Router();
const PublicUserView = require('../models/PublicUserView');

router.get('/', async (req, res) => {
  if (req.query.q) {
    const users = await PublicUserView.getUserByLikeUsernameOrName(req.query.q);
    return res.json(users);
  }
  const users = await PublicUserView.getAllUsers();
  return res.json(users);
});

router.get('/:id', async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  const user = await PublicUserView.getUserByUserID(req.params.id);

  if (!user || user.length === 0) {
    return res.sendStatus(404);
  }

  return res.json(user[0]);
});

module.exports = router;
