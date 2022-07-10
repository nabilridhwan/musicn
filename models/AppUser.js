const { AppUser, SpotifyUser } = require('../utils/sequelize');

const AppUserModel = {
  // Updates the user information of username, email and name
  updateUser: async ({ username, email, name }, user_id) => {
    // Update the App User table
    await AppUser.update(
      {
        username,
        email,
      },
      {
        where: {
          user_id,
        },
      },
    );

    // Update the Spotify User table
    await SpotifyUser.update(
      { name },
      {
        where: {
          user_id,
        },
      },
    );

    return true;
  },

  // Creates a new user in App User
  createNewUser: async ({ username, password, email }) => {
    const response = await AppUser.create({ username, email, password });
    return response;
  },
};

module.exports = AppUserModel;
