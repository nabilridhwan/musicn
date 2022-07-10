const pool = require('../utils/dbConfig');
const { AppUser } = require('../utils/sequelize');

const AppUserModel = {
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

  createNewUser: async ({ username, password, email }) => {
    const response = await AppUser.create({ username, email, password });
    return response;
  },
};

module.exports = AppUserModel;
