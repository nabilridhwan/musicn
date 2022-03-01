const supabase = require("../models/User");

async function getAllUsers() {
    let {
        data: users,
        error
    } = await supabase.from('users').select("*")

    if (error) {
        throw error 
    } else {
        return users
    }
}

async function insertUser({
    email,
    name,
    app_userid,
    spotify_userid,
    country,
    profile_pic_url,
    refresh_token
}) {
    const {
        data,
        error
    } = await supabase.from('users').insert([{
        email: email,
        name: name,
        app_userid: app_userid,
        spotify_userid: spotify_userid,
        country: country,
        profile_pic_url: profile_pic_url,
        refresh_token: refresh_token
    }])

    if (error) {
        throw error 
    } else {
        return data
    }
}