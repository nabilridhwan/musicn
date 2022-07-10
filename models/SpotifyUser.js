const pool = require('../utils/dbConfig');
const { SpotifyUser } = require('../utils/sequelize');

const SpotifyUserModel = {
  getUserByEmail: async (email) => {
    const response = await pool.query(
      'SELECT * FROM spotify_users WHERE email = $1;',
      [email],
    );
    return response.rows;
  },

  // TODO: Test this function
  updateSpotifyUser: async (data, id) => {
    const [affectedRows, affectedModels] = await SpotifyUser.update(
      { ...data },
      { where: { id } },
    );

    return affectedModels;
  },

  insertUser: async ({
    email,
    name,
    spotify_userid,
    country,
    profile_pic_url,
    refresh_token,
    user_id,
  }) => {
    const res = await pool.query(
      `
                INSERT INTO spotify_users (email, name, spotify_userid, country, profile_pic_url, refresh_token, user_id) VALUES ('${email}', '${name}', '${spotify_userid}', '${country}', '${profile_pic_url}', '${refresh_token}', '${user_id}') RETURNING id, email, name, country, spotify_userid, profile_pic_url, refresh_token, user_id;
                `,
    );
    return res.rows;
  },
};

module.exports = SpotifyUserModel;
