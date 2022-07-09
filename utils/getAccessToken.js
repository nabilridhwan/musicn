const axios = require('axios');
require('dotenv').config();

module.exports = async (refreshToken) => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken);

  const response = await axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: formData,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { data } = response;

  // TODO: Error
  // if (data.data.error) {
  //   throw new Error(data.data.error);
  // }

  return data;
};
