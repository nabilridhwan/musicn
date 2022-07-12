const express = require('express');
const jwt = require('jsonwebtoken');
const yup = require('yup');

const {
  ForeignKeyConstraintError,
  UniqueConstraintError,
} = require('sequelize');

const AppUser = require('../models/AppUser');
const isUsernameForbidden = require('../utils/isUsernameForbidden');
const Passwords = require('../utils/Passwords');
const Users = require('../models/Users');

const router = express.Router();

router.post('/signup', async (req, res) => {
  // Validate input
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    username: yup.string().required(),
    password: yup.string().required(),
  });

  try {
    schema.validateSync(req.body);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  let { name, email, username, password } = req.body;

  // Check username
  if (isUsernameForbidden(username)) {
    console.log(username);
    res.cookie('jwt', 'balls');
    return res.status(400).json({
      message:
        'Usernames can only contain a-z, underscore, periods and numbers',
    });
  }

  email = encodeURI(email);
  username = encodeURI(username);
  password = encodeURI(password);

  try {
    // Hash the password
    const hashedPassword = await Passwords.generateHash(password);
    const inserted = await AppUser.createNewUser({
      name,
      email,
      username,
      password: hashedPassword,
    });

    const insertedUsername = inserted.getDataValue('username');
    const insertedUserId = inserted.getDataValue('user_id');
    const insertedProfilePicUrl = inserted.getDataValue('profile_pic_url');

    // Generate Token that stores the user_id and username inside
    const token = jwt.sign(
      {
        user_id: insertedUserId,
        username: insertedUsername,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      },
    );

    // Return cookie with maxAge of 30 mins
    res.cookie('jwt', token, {
      maxAge: 1800000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    });

    res.cookie('loggedIn', true, {
      maxAge: 1800000,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
    });

    // Return response
    res.status(200).json({
      message: 'Sign up successful',
      username: insertedUsername,
      profile_pic_url: insertedProfilePicUrl,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    return res.status(500).json({
      message:
        'There was an error creating your account. Please try again later!',
    });
  }
});

router.post('/login', async (req, res) => {
  const reqBodySchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  let validated;

  try {
    validated = await reqBodySchema.validate(req.body);
  } catch (error) {
    // Return 400 if validation fails
    return res.status(400).json(error);
  }

  // Get the username and password
  let { email, password } = validated;

  email = encodeURI(email);
  password = encodeURI(password);

  try {
    // Verify the username and password
    const user = await Users.getUsersByEmailOrUsername(email, email, true);
    console.log(user);

    // Check if there is no user
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isMatch = await Passwords.compareHash(password, user.password);

    if (isMatch) {
      // Generate token
      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        },
      );

      // Return cookie with maxAge of 30 mins
      res.cookie('jwt', token, {
        maxAge: 1800000,
        httpOnly: true,
        sameSite: 'lax',
      });

      res.cookie('loggedIn', true, {
        maxAge: 1800000,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
      });

      // Return response
      return res.status(200).json({
        message: 'Login successful',
        username: user.username,
        profile_pic_url: user.profile_pic_url,
      });
    }

    return res.status(401).json({
      message: 'Invalid credentials',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Login unsuccessful',
    });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('loggedIn');
  res.status(200).json({
    message: 'Cookie deleted!',
  });
});

// TODO: Fix this endpoint
// router.put('/', isCookieAvailable, (req, res) => {
//   console.log(req.cookies);
//   jwt.verify(req.cookies.jwt, process.env.JWT_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({
//         message: 'Invalid token',
//       });
//     }

//     const { user_id } = decoded;
//     const { username } = req.body;

//     AppUser.changeUsername(username, user_id)
//       .then((user) => {
//         res.json({
//           message: 'Username Updated',
//         });
//       })
//       .catch((err) => {
//         if (err.code == 23505) {
//           return res.status(409).json({
//             message: 'Username already exists!',
//           });
//         } else {
//           return res.status(500).json(err);
//         }
//       });
//   });
// });

module.exports = router;
