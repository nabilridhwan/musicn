const {
    default: axios
} = require("axios");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserUtils = require("../utils/User");

router.get("/", (req, res) => {
    User.getAllUsers().then(users => {
        const response = users.map(user => {
            return {
                app_userid: user.app_userid,
                profile_pic_url: user.profile_pic_url,
                name: user.name
            }
        })

        res.json(response)
    })
})

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    User.getUserByAppUserID(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {

                    user = user[0];

                    const {
                        access_token
                    } = data;

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        const follower_count = response.data.followers.total;

                        const rtnbody = {
                            app_userid: user.app_userid,
                            spotify_userid: user.spotify_userid,
                            profile_pic_url: user.profile_pic_url,
                            name: user.name,
                            follower_count: follower_count
                        }

                        return res.json(rtnbody)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })



                })
            }
        })
})

module.exports = router;