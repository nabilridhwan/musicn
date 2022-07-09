const pool = require('../utils/dbConfig');

const SpotifyUser = {
  getUserByEmail: async (email) => {
    const response = await pool.query(
      'SELECT * FROM spotify_users WHERE email = $1;',
      [email],
    );
    return response.rows;
  },

  updateSpotifyUser: async (data, id) => {
    const {
      email,
      name,
      country,
      spotify_userid,
      profile_pic_url,
      refresh_token,
      user_id,
    } = data;

    const response = await pool.query(
      `
                UPDATE spotify_users
                SET email = $1,
                name = $2,
                country = $3,
                spotify_userid = $4,
                profile_pic_url = $5,
                refresh_token = $6,
                user_id = $7
                WHERE id = $8;
                `,
      [
        email,
        name,
        country,
        spotify_userid,
        profile_pic_url,
        refresh_token,
        user_id,
        id,
      ],
    );
    return response.rows;
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

module.exports = SpotifyUser;
