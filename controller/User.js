const express = require('express');

const router = express.Router();
const Users = require('../models/Users');

router.get('/', async (req, res) => {
  if (req.query.q) {
    const users = await Users.getUsersByLikeUsernameOrName(req.query.q);
    if (!users || users.length === 0) {
      return res.json([]);
    }
    return res.json(users[0]);
  }
  const users = await Users.getAllUsers();
  return res.json(users);
});

router.get('/:id', async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  const user = await Users.getUserByUsername(req.params.id);

  if (!user) {
    return res.status(200).json([]);
  }

  return res.json(user);
});

module.exports = router;
