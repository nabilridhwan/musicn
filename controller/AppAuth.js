const AppUser = require("../models/AppUser");
const UserView = require("../models/UserView");
const validator = require("validator");
const isUsernameForbidden = require("../utils/isUsernameForbidden")
const Passwords = require("../utils/Passwords")
const {sign} = require("../utils/jwt")

module.exports.signup = async (req, res) => {
    try {

        if (!req.body.email) throw new Error("Email is required")
        if (!req.body.username) throw new Error("Username is required")
        if (!req.body.password) throw new Error("Password is required")

        // Check email
        if (!validator.isEmail(req.body.email)) throw new Error("Email is not valid")

        // Check username
        if (isUsernameForbidden(req.body.username)) throw new Error("Usernames can only contain lowercase letters, underscore, periods and numbers")

        req.body.email = encodeURI(req.body.email);
        req.body.username = encodeURI(req.body.username);
        req.body.password = encodeURI(req.body.password);

        const existingUser = await UserView.getUserByEmailOrUsername(req.body.username, req.body.email)

        if (existingUser.length > 0) throw new Error("User already exists")

        const password = Passwords.generateHash(req.body.password)
        const [user] = await AppUser.insertUser({
            username: req.body.username,
            password: password,
            email: req.body.email
        })

        const token = await sign(user.user_id, user.username)

        // Return cookie with maxAge of 30 mins
        res.cookie("jwt", token, {
            maxAge: 1800000,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax"
        })

        res.cookie("loggedIn", true, {
            maxAge: 1800000,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax"
        })

        // Return response
        return res.json({
            message: "Sign up successful",
            username: user.username,
            profile_pic_url: user.profile_pic_url
        })


    } catch (e) {
        return res.status(422).json({
            message: e.message
        })
    }
}

module.exports.login = async (req, res) => {

    try {

        if (!req.body.email) throw new Error("Email is required")
        if (!req.body.password) throw new Error("Password is required")

        // Encode
        req.body.email = encodeURI(req.body.email);
        req.body.password = encodeURI(req.body.password);

        const user = await UserView.getUserByEmailOrUsername(req.body.email, req.body.password)

        if (user.length === 0) {
            res.status(401);
            throw new Error("Invalid email or password")
        }

        const isMatch = await Passwords.compareHash(req.body.password, user[0].password)

        if (isMatch) {

            const token = await sign(user[0].user_id, user[0].username)

            // Return cookie with maxAge of 30 mins
            res.cookie("jwt", token, {
                maxAge: 1800000,
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax"
            })

            res.cookie("loggedIn", true, {
                maxAge: 1800000,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax"
            })


            // Return response
            res.status(200).json({
                message: "Login successful",
                username: user[0].username,
                profile_pic_url: user[0].profile_pic_url
            })
        }else{
            res.status(401);
            throw new Error("Invalid email or password")
        }

    } catch (error) {
        const status = res.statusCode ? res.statusCode : 500;
        return res.status(status).json({
            message: error.message
        })
    }

}

module.exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    res.clearCookie("loggedIn");
    return res.json({
        message: "Logout successful"
    })
}