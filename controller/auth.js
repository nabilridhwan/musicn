const express = require("express");
const router = express.Router();
const axios = require("axios");
const randomstring = require("randomstring");
const User = require("../models/User");

require("dotenv").config()

const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing"
const SHOW_DIALOG = true;

router.get("/", (req, res) => {
    return res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`)
})


router.get("/callback", (req, res) => {
    if (req.query.error) {
        // Error has occurred 
        return res.sendStatus(500);
    }

    const {
        code
    } = req.query;

    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code")
    formData.append("code", code)
    formData.append("redirect_uri", process.env.REDIRECT_URI)

    axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: formData,
        headers: {
            "Authorization": `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(tokenResponse => {
        // Save the access token in database
        // Get user email

        axios.get("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": `Bearer ${tokenResponse.data.access_token}`
            }
        }).then(userResponse => {

            let app_userid = randomstring.generate(10);

            const {
                email,
                display_name,
                country,
                images,
                id,
                followers: {
                    total: follower_count
                }
            } = userResponse.data;

            let saveBody = {
                email: email,
                name: display_name,
                app_userid: app_userid,
                spotify_userid: id,
                country: country,
                images: images,
                refresh_token: tokenResponse.data.refresh_token,
                follower_count: follower_count
            }

            // Check if user exists or not
            User.getUserByEmail(email).then(user => {
                if (user.length == 0) {
                    User.insertUser(saveBody).then(user => {
                        return res.redirect(`/user/${user.app_userid}`)
                    }).catch(error => {
                        // TODO: Error handling
                        return res.status(500).json(error)
                    })
                } else {
                    return res.redirect(`${process.env.FRONTEND_URL}/user/${user[0].app_userid}`)
                }
            }).catch(error => {
                return res.status(500).json(error)
            })



        }).catch(error => {
            console.log(error)
            return res.send("There is a problem registering your account. Please try again later!")
        })

    }).catch(error => {
        console.log("An error occured")
        return res.status(500).send(error)
    })
})

module.exports = router;