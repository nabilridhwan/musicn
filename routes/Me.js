const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/AppUser");
const isCookieAvailable = require("../middlewares/isCookieAvailable");
const isUsernameForbidden = require("../utils/isUsernameForbidden");

const validator = require("validator");


const UserView = require("../models/UserView");

router.get("/", isCookieAvailable, (req, res) => {
    const {
        jwt: token
    } = req.cookies;
    console.log(token)
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        } else {

            UserView.getUserByUserID(decoded.user_id)
                .then(user => {
                    if (user.length == 0) {
                        return res.sendStatus(404)
                    }
                    return res.json(user)
                })
        }
    })
})

router.put("/", isCookieAvailable, (req, res) => {

    const {
        jwt: token
    } = req.cookies;


    let{
        username,
        email,
        name
    } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Email is not valid"
        })
    }

    if (isUsernameForbidden(username)) {
        return res.status(400).json({
            message: "Usernames can only contain a-z, underscore, periods and numbers"
        })
    }

    email = encodeURI(email);
    name = encodeURI(name);

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        } else {
            User.updateUser({
                    username,
                    email,
                    name
                }, decoded.user_id)
                .then(user => {
                    console.log("Body : " + JSON.stringify(req.body))
                    console.log(user)
                    return res.json(user);
                }).catch(e => {
                    console.log(e)
                    return res.status(409).send({message: "Username or Email already exists"})
                })
        }
    })
})

module.exports = router;