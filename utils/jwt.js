const jwt = require("jsonwebtoken")

module.exports.sign = async (user_id, username) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            user_id: user_id,
            username: username
        }, process.env.JWT_KEY, {
            expiresIn: "30m"
        }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

module.exports.decode = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}