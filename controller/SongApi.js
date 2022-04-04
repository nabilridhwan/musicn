const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserUtils = require("../utils/User");
const UserView = require("../models/UserView");

router.get("/:id/top_songs", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    // throw new Error("Not implemented");

    let limit = 15;
    let term = "short_term"

    if (req.query.term) {
        term = req.query.term;
    }

                    console.log(limit, term)

    // Get new token from refresh token
    UserView.getUserByUsername(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {
                    const {
                        access_token
                    } = data;



                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${term}`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    return res.status(500).json(error)
                })
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })
})

router.get("/:id/currently_playing", (req, res) => {
    // throw new Error("Not implemented");
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    UserView.getUserByUsername(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {

                    const {
                        access_token
                    } = data;

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/player/currently-playing`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    return res.status(500).json(error)
                })
            }
        })

})

router.get("/:id/recently_played", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    // Get new token from refresh token
    UserView.getUserByUsername(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                UserUtils.getAccessToken(user[0].refresh_token).then(data => {
                    const {
                        access_token
                    } = data;

                    console.log("access_token: " + access_token)

                    axios({
                        method: "GET",
                        url: `https://api.spotify.com/v1/me/player/recently-played?limit=10`,
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }).then(response => {
                        return res.json(response.data)
                    }).catch(error => {
                        console.log("Error while getting recently played")
                        return res.status(500).json(error.response.data)
                    })
                }).catch(error => {
                    console.log("Error while getting access token")
                    return res.status(500).json(error)
                })
            }
        })

})

module.exports = router;