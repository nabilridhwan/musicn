const supabase = require("../utils/db");
const tableName = "spotify_users";

const SpotifyUser = {
    getUserByEmail: async (email) => {

        let {
            data: users,
            error
        } = await supabase.from(tableName).select("*").like('email', email)

        if (error) {
            throw error
        } else {
            return users
        }

    },

    updateSpotifyUser: async (newStuff, id) => {

        const {
            data,
            error
        } = await supabase.from(tableName).update(newStuff).match({
            id: id
        })

        if (error) {
            throw error
        } else {
            return data
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

        const {
            data,
            error
        } = await supabase.from(tableName).insert([{
            email: email,
            name: name,
            spotify_userid: spotify_userid,
            country: country,
            profile_pic_url: profile_pic_url,
            refresh_token: refresh_token,
            user_id: user_id
        }])

        if (error) {
            throw error
        } else {
            return data
        }

    }

}

module.exports = SpotifyUser