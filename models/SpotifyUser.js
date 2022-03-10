const pool = require("../utils/dbConfig")

const SpotifyUser = {
    getUserByEmail: async (email) => {


        try {

            let res = await pool.query(
                `
                SELECT * FROM spotify_users WHERE email = '${email}'; 
                `
            )
            return res.rows
        } catch (e) {
            throw e
        }

    },

    updateSpotifyUser: async (newStuff, id) => {

        const {
            email,
            name,
            country,
            spotify_userid,
            profile_pic_url,
            refresh_token,
            user_id
        } = newStuff



        try {

            let res = await pool.query(
                `
                UPDATE spotify_users
                SET email = '${email}',
                name = '${name}',
                country = '${country}',
                spotify_userid = '${spotify_userid}',
                profile_pic_url = '${profile_pic_url}',
                refresh_token = '${refresh_token}',
                user_id = '${user_id}'
                WHERE id = ${id};
                `
            )
            return res.rows
        } catch (e) {
            throw e
        }


    },

    insertUser: async ({
        email,
        name,
        spotify_userid,
        country,
        profile_pic_url,
        refresh_token,
        user_id
    }) => {

        try {

            let res = await pool.query(
                `
                INSERT INTO spotify_users (email, name, spotify_userid, country, profile_pic_url, refresh_token, user_id) VALUES ('${email}', '${name}', '${spotify_userid}', '${country}', '${profile_pic_url}', '${refresh_token}', '${user_id}') RETURNING id, email, name, country, spotify_userid, profile_pic_url, refresh_token, user_id;
                `
            )
            return res.rows
        } catch (e) {
            throw e
        }
    }

}

module.exports = SpotifyUser