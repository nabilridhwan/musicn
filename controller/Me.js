const {
    default: axios
} = require("axios");
const express = require("express");
const router = express.Router();

const SpotifyUser = require("../models/SpotifyUser");
const jwt = require("jsonwebtoken");
const User = require("../models/AppUser");
const isCookieAvailable = require("../middlewares/isCookieAvailable");
const isUsernameForbidden = require("../utils/isUsernameForbidden");
router.get("/", isCookieAvailable, (req, res) => {
    const {
        jwt: token
    } = req.cookies;
    console.log(token)
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        } else {
            SpotifyUser.getUserByUserID(decoded.user_id)
                .then(user => {
                    return res.json(user)
                })
        }
    })
})

router.put("/", isCookieAvailable, (req, res) => {

    const {
        jwt: token
    } = req.cookies;

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        } else {

            if (isUsernameForbidden(req.body.username)) {
                return res.status(400).json({
                    message: "Usernames can only contain a-z, underscore, periods and numbers"
                })
            }

            User.updateUser(req.body, decoded.user_id)
                .then(user => {
                    console.log("Body : " + JSON.stringify(req.body))
                    console.log(user)
                    return res.json(user);
                }).catch(e => {
                    console.log(e)
                    return res.status(409).send(e)
                })
        }
    })
})

module.exports = router;