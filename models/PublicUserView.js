const { Op } = require('sequelize');
const { AppUser, SpotifyUser } = require('../utils/sequelize');

const PublicUserView = {
  getAllUsers: async () => {
    const response = await AppUser.findAll({
      attributes: ['user_id', 'username'],
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

  getUserByUserID: async (userId) => {
    const response = await AppUser.findAll({
      attributes: ['user_id', 'username'],
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

  getUserByUsername: async (username) => {
    const response = await AppUser.findAll({
      attributes: ['user_id', 'username'],
      where: {
        [Op.like]: `%${username}%`,
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

  getUserByLikeUsernameOrName: async (username) => {
    const response = await AppUser.findAll({
      attributes: ['user_id', 'username'],
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

  getUserByEmail: async (email) => {
    const response = await AppUser.findAll({
      attributes: ['user_id', 'username'],
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
};

module.exports = PublicUserView;
