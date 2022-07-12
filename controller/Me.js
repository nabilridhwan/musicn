const express = require('express');

const router = express.Router();

const yup = require('yup');

const jwt = require('jsonwebtoken');
const User = require('../models/AppUser');
const getUserToken = require('../middlewares/getUserToken');
const isUsernameForbidden = require('../utils/isUsernameForbidden');
const Users = require('../models/Users');
const { ForeignKeyConstraintError } = require('sequelize');
const { generateHash } = require('../utils/Passwords');

// ! Get the current user details
router.get('/', getUserToken, async (req, res) => {
  const { token } = req;

  let userIdFromToken;

  try {
    const { user_id } = await jwt.verify(token, process.env.JWT_KEY);
    userIdFromToken = user_id;
    console.log('Decoded');
  } catch (error) {
    return res.status(403).json({ message: 'Token error' });
  }

  const user = await Users.getUserByUserID(userIdFromToken, true);

  if (user.length === 0) {
    return res.sendStatus(404);
  }
  return res.json(user);
});

// ! Update the current user details
router.put('/', getUserToken, async (req, res) => {
  const { token } = req;

  const reqBodySchema = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
  });

  try {
    const validated = await reqBodySchema.validate(req.body);

    let { username, email, name, password } = validated;

    if (username && isUsernameForbidden(username)) {
      return res.status(400).json({
        message:
          'Usernames can only contain a-z, underscore, periods and numbers',
      });
    }

    email = email && encodeURI(email);
    name = name && encodeURI(name);
    password = password && (await generateHash(password));

    let decoded;

    try {
      decoded = await jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.sendStatus(403);
    }

    try {
      const user = await User.updateUser(
        {
          username,
          email,
          name,
          password,
        },
        decoded.user_id,
      );
      console.log('Body : ' + JSON.stringify(req.body));
      console.log(user);
      return res.json(user);
    } catch (error) {
      console.log(error);
      if (error instanceof ForeignKeyConstraintError) {
        return res
          .status(409)
          .send({ message: 'Username or Email already exists' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Invalid request' });
  }
});

module.exports = router;
