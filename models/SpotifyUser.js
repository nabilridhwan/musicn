const supabase = require("../utils/db");
const tableName = "spotify_users";

async function getAllUsers() {
    let {
        data: users,
        error
    } = await supabase.from("user_view").select(`
        *
    `)

    if (error) {
        throw error
    } else {
        return users
    }
}

async function getUserByUserID(userid){

    console.log(userid)

    let {
        data: users,
        error
    } = await supabase.from("user_view").select(
        `
        *
        `
    ).eq("user_id", userid)

    if (error) {
        throw error
    } else {
        return users
    }
}

async function getUserByAppUserID(app_userID) {

    let {
        data: users,
        error
    } = await supabase.from("user_view").select(
        `
        *
        `
    ).eq("username", app_userID)

    if (error) {
        throw error
    } else {
        return users
    }
}

async function getUserByEmailAndPassword(email, password) {
    let {
        data: users,
        error
    } = await supabase.from(tableName).select("*").match({email: email, password: password})

    if (error) {
        throw error
    } else {
        return users
    }
}

async function getUserByEmail(email) {

    let {
        data: users,
        error
    } = await supabase.from(tableName).select("*").like('email', email)

    if (error) {
        throw error
    } else {
        return users
    }
}

async function updateSpotifyUser(newStuff, id){
    const {
        data,
        error
    } = await supabase.from(tableName).update(newStuff
    ).match({id: id})

    if (error) {
        throw error
    } else {
        return data
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
    } = await supabase.from(tableName).insert([{
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

module.exports = {
    insertUser,
    getAllUsers,
    getUserByEmail,
    getUserByAppUserID,
    getUserByEmailAndPassword,
    getUserByUserID,
    updateSpotifyUser
}