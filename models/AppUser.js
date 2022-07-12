const { AppUser, SpotifyUser } = require('../utils/sequelize');

const AppUserModel = {
  // Updates the user information of username, email and name
  updateUser: async (params, user_id) => {
    console.log(`Updating ${user_id} with ${JSON.stringify({ ...params })}`);
    // Update the App User table
    const result = await AppUser.update(
      { ...params },
      {
        where: {
          user_id,
        },
        returning: true,
      },
    );

    return result;
  },

  // Creates a new user in App User
  createNewUser: async (params) => {
    const response = await AppUser.create({
      name: params.name,
      username: params.username,
      email: params.email,
      password: params.password,
    });
    return response;
  },
};

module.exports = AppUserModel;
