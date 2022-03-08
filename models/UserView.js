const client = require("../utils/dbConfig")

const UserView = {

    // Used in sign up 
    getUserByEmailOrUsername: async (username, email) => {

        try {

            let res = await client.query(
                `SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE (a.username = '${username}' OR a.email = '${email}');`,
            )
            return res.rows
        } catch (e) {
            throw e
        }

    },


    getAllUsers: async () => {

        try {

            let res = await client.query(
                `SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s WHERE a.user_id = s.user_id;`,
            )
            return res.rows
        } catch (e) {
            throw e
        }

    },

    getUserByUserID: async (userid) => {


        try {

            let res = await client.query(
                `SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.user_id = ${userid};`,
            )
            return res.rows
        } catch (e) {
            throw e
        }

    },

    getUserByUsername: async (username) => {

        try {

            let res = await client.query(
                `SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.username = '${username}';`,
            )
            return res.rows
        } catch (e) {
            throw e
        }

    },

    getUserByEmail: async (email) => {

        try {

            let res = await client.query(
                `SELECT a.*, s."name", s.country, s.profile_pic_url, s.refresh_token, s.spotify_userid FROM app_users a LEFT JOIN spotify_users s ON a.user_id = s.user_id WHERE a.email = '${email}';`,
            )
            return res.rows
        } catch (e) {
            throw e
        }

    }
}

module.exports = UserView