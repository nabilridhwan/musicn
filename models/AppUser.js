const supabase = require("../utils/db");
const tableName = "app_users";

const AppUser = {

    updateUser: async (newStuff, user_id) => {
        const {
            data,
            error
        } = await supabase.from(tableName).update(newStuff).match({
            user_id: user_id
        })

        if (error) {
            throw error
        } else {
            return data
        }

    },
    insertUser: async ({
        username,
        password,
        email

    }) => {

        const {
            data,
            error
        } = await supabase.from(tableName).insert([{
            username: username,
            password: password,
            email: email
        }])

        if (error) {
            throw error
        } else {
            return data
        }

    }
}

module.exports = AppUser