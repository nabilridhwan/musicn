const pool = require('../utils/dbConfig');
const { SpotifyUser, AppUser } = require('../utils/sequelize');

const SpotifyUserModel = {
  getUserByEmail: async (email) => {
    const results = await SpotifyUser.findAll({
      where: {
        email,
      },
      raw: true,
      nest: true,
    });

    return results;
  },

  // TODO: Test this function
  updateSpotifyUser: async (data, id) => {
    const [affectedRows, affectedModels] = await SpotifyUser.update(
      { ...data },
      { where: { id } },
    );

    return affectedModels;
  },

  insertNewSpotifyUser: async ({
    email,
    name,
    spotify_userid,
    country,
    profile_pic_url,
    refresh_token,
    user_id,
  }) => {
    const results = await SpotifyUser.create(
      {
        email,
        name,
        spotify_userid,
        country,
        profile_pic_url,
        refresh_token,
        user_id,
      },
      { returning: true },
    );

    return results;
  },
};

module.exports = SpotifyUserModel;
