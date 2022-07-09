const express = require('express');

const router = express.Router();

const yup = require('yup');

const jwt = require('jsonwebtoken');
const User = require('../models/AppUser');
const getUserToken = require('../middlewares/getUserToken');
const isUsernameForbidden = require('../utils/isUsernameForbidden');

const UserView = require('../models/UserView');

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

  const user = await UserView.getUserByUserID(userIdFromToken);

  if (user.length === 0) {
    return res.sendStatus(404);
  }
  return res.json(user);
});

// ! Update the current user details
router.put('/', getUserToken, async (req, res) => {
  const { token } = req;

  const reqBodySchema = yup.object().shape({
    username: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  });

  try {
    const validated = reqBodySchema.validate(req.body);

    let { username, email, name } = validated;

    if (isUsernameForbidden(username)) {
      return res.status(400).json({
        message:
          'Usernames can only contain a-z, underscore, periods and numbers',
      });
    }

    email = encodeURI(email);
    name = encodeURI(name);

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      User.updateUser(
        {
          username,
          email,
          name,
        },
        decoded.user_id,
      )
        .then((user) => {
          console.log('Body : ' + JSON.stringify(req.body));
          console.log(user);
          return res.json(user);
        })
        .catch((e) => {
          console.log(e);
          return res
            .status(409)
            .send({ message: 'Username or Email already exists' });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Invalid request' });
  }
});

module.exports = router;
