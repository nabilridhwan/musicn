const express = require('express');

const router = express.Router();
const axios = require('axios');
const getAccessToken = require('../utils/getAccessToken');
const UserView = require('../models/UserView');
const getUserIdFromParams = require('../middlewares/getUserIdFromParams');

// ! Gets the user's top songs
router.get('/:id/top_songs', getUserIdFromParams, async (req, res) => {
  const limit = 15;
  let term = 'short_term';

  if (req.query.term) {
    term = req.query.term;
  }

  const { userId } = req;

  // Get new token from refresh token
  try {
    const user = await UserView.getUserByUsername(userId);
    if (!user || user.length === 0) {
      return res.sendStatus(404);
    }

    const accessTokenData = await getAccessToken(user[0].refresh_token);
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
router.get('/:id/currently_playing', getUserIdFromParams, async (req, res) => {
  const { userId } = req;

  try {
    // Get new token from refresh token
    const user = await UserView.getUserByUsername(userId);
    if (!user || user.length === 0) {
      return res.sendStatus(404);
    }

    const accessTokenData = await getAccessToken(user[0].refresh_token);

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
});

// ! Gets the user's recently played
router.get('/:id/recently_played', getUserIdFromParams, async (req, res) => {
  const { userId } = req;

  try {
    // Get new token from refresh token
    const user = await UserView.getUserByUsername(userId);

    if (!user || user.length === 0) {
      return res.sendStatus(404);
    }
    const accessTokenData = await getAccessToken(user[0].refresh_token);
    const { access_token } = accessTokenData;

    //   console.log('access_token: ' + access_token);

    const response = await axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
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

module.exports = router;
