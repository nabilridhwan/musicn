const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const UserUtils = require("../utils/User");

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    User.findOne({
        app_userid: req.params.id
    }).then(user => {

        if (!user) {
            return res.sendStatus(404)
        } else {
            UserUtils.getAccessToken(user.refresh_token).then(data=> {
                const {access_token} = data;

                axios({
                    method: "GET",
                    url: `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term`, 
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    }
                }).then(response => {
                    return res.json(response.data)
                })
            })
        }
    })
})

module.exports = router;