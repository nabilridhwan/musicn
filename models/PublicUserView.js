const pool = require('../utils/dbConfig');

const PublicUserView = {
  getAllUsers: async () => {
    const res = await pool.query(
      'SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id;',
    );
    return res.rows;
  },

  getUserByUserID: async (userId) => {
    const res = await pool.query(
      `SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.user_id = ${userId};`,
    );

    return res.rows;
  },

  getUserByUsername: async (username) => {
    const res = await pool.query(
      `SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.username = '${username}';`,
    );
    return res.rows;
  },

  getUserByLikeUsernameOrName: async (username) => {
    const res = await pool.query(
      `
                SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid
                FROM app_users a 
                LEFT JOIN spotify_users s
                ON a.user_id = s.user_id WHERE (a.username LIKE '%${username}%' OR s."name" LIKE '%${username}%');`,
    );
    return res.rows;
  },

  getUserByEmail: async (email) => {
    const res = await pool.query(
      `
                SELECT a.user_id, a.username, s.name, s.country, s.profile_pic_url, s.spotify_userid
                FROM app_users a 
                LEFT JOIN spotify_users s
                ON a.user_id = s.user_id WHERE a.email = "${email}"%');`,
    );
    return res.rows;
  },
};

module.exports = PublicUserView;
