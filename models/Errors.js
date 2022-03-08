const client = require("../utils/dbConfig")

async function getErrorByCode(code) {

        try {

            let res = await client.query(
                `
                SELECT *
                FROM "errors"
                WHERE id = ${code};`
            )
            return res.rows
        } catch (e) {
            throw e
        }

}

module.exports = {
    getErrorByCode
}