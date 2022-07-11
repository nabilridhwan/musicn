const express = require('express');

const router = express.Router();
const axios = require('axios');
const getAccessToken = require('../utils/getAccessToken');
const getUsernameFromParams = require('../middlewares/getUserIdFromParams');
const Users = require('../models/Users');

// ! Gets the user's top songs
router.get('/:username/top_songs', getUsernameFromParams, async (req, res) => {
  const limit = 15;
  let term = 'short_term';

  if (req.query.term) {
    term = req.query.term;
  }

  const { username } = req;

  // Get new token from refresh token
  try {
    const user = await Users.getUserByUsername(username, false, true);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.spotify_user.refresh_token === null) {
      return res.sendStatus(404);
    }

    const accessTokenData = await getAccessToken(
      user.spotify_user.refresh_token,
    );
    const { access_token } = accessTokenData;

    const response = await axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${term}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// ! Gets the user currently playing track
router.get(
  '/:username/currently_playing',
  getUsernameFromParams,
  async (req, res) => {
    const { username } = req;

    try {
      // Get new token from refresh token
      const user = await Users.getUserByUsername(username, false, true);
      if (!user) {
        return res.sendStatus(404);
      }

      if (user.spotify_user.refresh_token === null) {
        return res.sendStatus(404);
      }

      const accessTokenData = await getAccessToken(
        user.spotify_user.refresh_token,
      );

      const { access_token } = accessTokenData;

      const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return res.json(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
);

// ! Gets the user's recently played
router.get(
  '/:username/recently_played',
  getUsernameFromParams,
  async (req, res) => {
    const { username } = req;

    let user;
    let access_token;

    try {
      // Get new token from refresh token
      user = await Users.getUserByUsername(username, false, true);
    } catch (error) {
      console.log('Error getting user by username');
      return res.status(500).json(error);
    }

    try {
      if (!user) {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    console.log(user);

    if (user.spotify_user.refresh_token === null) {
      return res.sendStatus(404);
    }

    try {
      const accessTokenData = await getAccessToken(
        user.spotify_user.refresh_token,
      );
      const { access_token: accessTokenFromAPI } = accessTokenData;
      access_token = accessTokenFromAPI;
    } catch (error) {
      console.log('Error getting access token');
      return res.status(500).json(error);
    }

    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return res.json(response.data);
    } catch (error) {
      console.log("Error getting user's recently played");
      return res.status(500).json(error);
    }
  },
);

module.exports = router;
