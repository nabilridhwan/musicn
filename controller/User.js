const express = require("express");
const router = express.Router();

const SpotifyUser = require("../models/SpotifyUser");
const UserUtils = require("../utils/User");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    SpotifyUser.getAllUsers().then(users => {
        res.json(users)
    })
})

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    SpotifyUser.getUserByAppUserID(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                return res.json(user[0])
            }
        })
})

module.exports = router;