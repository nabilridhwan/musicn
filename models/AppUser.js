const supabase = require("../utils/db");
const tableName = "app_users";
const client = require("../utils/dbConfig")

const AppUser = {

    // TODO: Update to pg instead of supabase
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


        try {

            let res = await client.query(
                `INSERT INTO app_users (username, password, email) VALUES ('${username}', '${password}', '${email}') RETURNING user_id, username;`,
            )
            return res.rows
            
        } catch (e) {
            throw e
        }


    }
}

module.exports = AppUser