const supabase = require("../utils/db");
const tableName = "errors";

async function getErrorByCode(code) {
    let {
        data: users,
        error
    } = await supabase.from(tableName).select("*").match({"id": code})

    if (error) {
        throw error
    } else {
        return users
    }
}

module.exports = {
    getErrorByCode
}