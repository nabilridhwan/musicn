const { Op } = require('sequelize');
const pool = require('../utils/dbConfig');
const { AppUser } = require('../utils/sequelize');

/*
  ! This file is meant for User View (including getting the Passwords of users while Public User View is not)
*/
const UserView = {
  // Used in sign up
  getUserByEmailOrUsername: async (username, email) => {
    const response = await AppUser.findOne({
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

  getAllUsers: async () => {
    const response = await pool.query(
      'SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s WHERE a.user_id = s.user_id;',
    );
    return response.rows;
  },

  getUserByUserID: async (userid) => {
    const response = await pool.query(
      'SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.user_id = $1;',
      [userid],
    );
    return response.rows;
  },

  getUserByUsername: async (username) => {
    const response = await pool.query(
      'SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.username = $1;',
      [username],
    );
    return response.rows;
  },

  getUserByEmail: async (email) => {
    const response = await pool.query(
      'SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.email = $1;',
      [email],
    );
    return response.rows;
  },
};

module.exports = UserView;
