const supabase = require("../utils/db");
const tableName = "app_users";

async function getUserByUsername(username){
    let {
        data: users,
        error
    } = await supabase.from(tableName).select("*").match({username})

    if (error) {
        throw error
    } else {
        return users
    }
}

async function getUserByUsernameAndPassword(username, password) {
    let {
        data: users,
        error
    } = await supabase.from(tableName).select("*").match({username, password})

    if (error) {
        throw error
    } else {
        return users
    }
}

async function updateUser(newStuff, user_id){
    const {
        data,
        error
    } = await supabase.from(tableName).update(newStuff
    ).match({user_id: user_id})

    if (error) {
        throw error
    } else {
        return data
    }
}

async function insertUser({
    username,
    password
}) {
    const {
        data,
        error
    } = await supabase.from(tableName).insert([{
        username: username,
        password: password
    }])

    if (error) {
        throw error
    } else {
        return data
    }
}

module.exports = {
    insertUser,
    getUserByUsernameAndPassword,
    getUserByUsername,
    updateUser
}