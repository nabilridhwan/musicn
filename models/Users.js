const { Op } = require('sequelize');
const { AppUser, SpotifyUser } = require('../utils/sequelize');

const Users = {
  getAllUsers: async (showPassword = false) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      include: [
        {
          model: SpotifyUser,
          attributes: ['name', 'country', 'profile_pic_url', 'spotify_userid'],
        },
      ],
      raw: true,
      nest: true,
    });

    return response;
  },

  getUserByUserID: async (userId, showPassword = false) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      where: {
        user_id: userId,
      },
      include: [
        {
          model: SpotifyUser,
          attributes: ['name', 'country', 'profile_pic_url', 'spotify_userid'],
        },
      ],
      raw: true,
      nest: true,
    });

    return response;
  },

  getUsersByUsername: async (
    username,
    showPassword = false,
    showRefreshToken = false,
  ) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const spotifyUserAttributes = showRefreshToken
      ? [
          'name',
          'country',
          'profile_pic_url',
          'spotify_userid',
          'refresh_token',
        ]
      : ['name', 'country', 'profile_pic_url', 'spotify_userid'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      where: {
        username,
      },
      include: [
        {
          model: SpotifyUser,
          attributes: spotifyUserAttributes,
        },
      ],
      raw: true,
      nest: true,
    });

    return response;
  },

  getUserByLikeUsernameOrName: async (username, showPassword = false) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      include: [
        {
          model: SpotifyUser,
          attributes: ['name', 'country', 'profile_pic_url', 'spotify_userid'],
          where: {
            name: {
              [Op.like]: `%${username}%`,
            },
          },
        },
      ],
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
      raw: true,
      nest: true,
    });

    return response;
  },

  getUserByEmail: async (email, showPassword = false) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      include: [
        {
          model: SpotifyUser,
          attributes: ['name', 'country', 'profile_pic_url', 'spotify_userid'],
        },
      ],
      where: {
        email,
      },
      raw: true,
      nest: true,
    });

    return response;
  },

  getUserByEmailOrUsername: async (username, email, showPassword = false) => {
    const appUserAttributes = showPassword
      ? ['user_id', 'username', 'password']
      : ['user_id', 'username'];

    const response = await AppUser.findAll({
      attributes: appUserAttributes,
      where: {
        [Op.or]: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
      raw: true,
      nest: true,
    });

    return response;
  },
};

module.exports = Users;
