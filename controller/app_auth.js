const express = require("express");
const jwt = require("jsonwebtoken");
const isCookieAvailable = require("../middlewares/isCookieAvailable");
const router = express.Router();
const AppUser = require("../models/AppUser");
const UserView = require("../models/UserView");
const isUsernameForbidden = require("../utils/isUsernameForbidden");
const Passwords = require("../utils/Passwords")

const validator = require("validator");

router.post("/signup", (req, res) => {

    let {
        email,
        username,
        password
    } = req.body;

    // Check email
    if(!validator.isEmail(email)){
        return res.status(400).json({
            message: "Email is not valid"
        })
    }

    // Check username
    if (isUsernameForbidden(username)) {
        return res.status(400).json({
            message: "Usernames can only contain a-z, underscore, periods and numbers"
        })
    }

    email = encodeURI(email);
    username = encodeURI(username);
    password = encodeURI(password);


    UserView.getUserByEmailOrUsername(username, email)
        .then(users => {
            console.log(users)
            if (users.length > 0) {
                return res.status(409).json({
                    message: "User already exists!"
                });
            } else {
                Passwords.generateHash(password)
                    .then(hash => {
                        AppUser.insertUser({
                                username,
                                password: hash,
                                email
                            })
                            .then(user => {

                                // Get the user
                                user = user[0]

                                // Token
                                const token = jwt.sign({
                                    user_id: user.user_id,
                                    username: user.username
                                }, process.env.JWT_KEY, {
                                    expiresIn: "1h"
                                })

                                // Return cookie with maxAge of 30 mins
                                res.cookie("jwt", token, {
                                    maxAge: 1800000,
                                    httpOnly: true,
                                    secure: process.env.NODE_ENV !== "development",
                                    sameSite: process.env.NODE_ENV !== "development"
                                })

                                // Return response
                                res.status(200).json({
                                    message: "Sign up successful",
                                    username: user.username,
                                profile_pic_url: user.profile_pic_url
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                res.status(500).json(error);
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json(error);
                    })
            }
        }).catch(error => {
            console.log(error)
            return res.status(500).json(error)
        })

})

router.post("/login", (req, res) => {
    // Get the username and password
    let {
        email,
        password
    } = req.body;

    email = encodeURI(email);
    password = encodeURI(password);

    // Verify the username and password
    UserView.getUserByEmailOrUsername(email, email)
        .then(user => {
            if (user.length == 0) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {

                Passwords.compareHash(password, user[0].password)
                    .then(isMatch => {
                        if (isMatch) {
                            const token = jwt.sign({
                                user_id: user[0].user_id,
                                username: user[0].username
                            }, process.env.JWT_KEY, {
                                expiresIn: "1h"
                            })

                            // Return cookie with maxAge of 30 mins
                            res.cookie("jwt", token, {
                                maxAge: 1800000,
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: process.env.NODE_ENV !== "development"
                            })

                            // Return response
                            res.status(200).json({
                                message: "Login successful",
                                username: user[0].username,
                                profile_pic_url: user[0].profile_pic_url
                            })
                        } else {
                            res.status(401).json({
                                message: "Invalid credentials"
                            })
                        }
                    })

            }
        }).catch(err => {
            return res.status(500).json({
                message: "Login unsuccessful",
            })
        })
})

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        message: "Cookie deleted!"
    })
})

router.put("/", isCookieAvailable, (req, res) => {
    console.log(req.cookies)
    jwt.verify(req.cookies.jwt, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            const {
                user_id
            } = decoded;

            const {
                username
            } = req.body;

            AppUser.changeUsername(username, user_id)
                .then(user => {
                    res.json({
                        message: "Username Updated"
                    })
                }).catch(err => {
                    if (err.code == 23505) {
                        return res.status(409).json({
                            message: "Username already exists!"
                        })
                    } else {
                        return res.status(500).json(err)
                    }
                })
        }
    })
})

module.exports = router;