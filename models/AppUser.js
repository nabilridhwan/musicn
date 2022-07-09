const pool = require('../utils/dbConfig');

const AppUser = {
  updateUser: async ({ username, email, name }, user_id) => {
    // TODO: Make this into a single query
    const res = await pool.query(
      `
                UPDATE app_users
                SET
                username = '${username}',
                email = '${email}'
                WHERE app_users.user_id = ${user_id};


                UPDATE spotify_users
                SET
                name = '${name}'
                WHERE spotify_users.user_id = ${user_id};
                `,
    );
    return res.rows;
  },

  insertUser: async ({ username, password, email }) => {
    const res = await pool.query(
      `INSERT INTO app_users (username, password, email) VALUES ('${username}', '${password}', '${email}') RETURNING user_id, username;`,
    );
    return res.rows;
  },
};

module.exports = AppUser;
