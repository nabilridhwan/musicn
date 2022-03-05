const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/SpotifyUser");
const AppUser = require("../models/AppUser");
const isCookieAvailable = require("../middlewares/isCookieAvailable");
const jwt = require("jsonwebtoken");

require("dotenv").config()

const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing"
const SHOW_DIALOG = true;

router.get("/", (req, res) => {
    return res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`)
})


router.get("/callback", isCookieAvailable, (req, res) => {
    if (req.query.error) {
        // Error has occurred 
        return res.sendStatus(500);
    }

    // Decode jwt
    jwt.verify(req.cookies.jwt, process.env.JWT_KEY, (err, decoded) => {


        if(err) return res.status(500).send("Error decoding token")

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

                console.log(userResponse)


                let {
                    email,
                    display_name,
                    country,
                    images,
                    id,
                } = userResponse.data;

                if(images.length == 0){
                    images = null
                }else{
                    images = images[0].url
                }

                let saveBody = {
                    email: email,
                    name: display_name,
                    country: country,
                    spotify_userid: id,
                    profile_pic_url: images,
                    refresh_token: tokenResponse.data.refresh_token,
                    user_id: decoded.user_id
                }

                // Check if user exists or not
                User.getUserByEmail(email).then(user => {
                    console.log("users: " + JSON.stringify(user))
                    if (user.length == 0) {
                        User.insertUser(saveBody).then(user => {
                            return res.redirect(`${process.env.FRONTEND_URL}/profile`)
                        }).catch(error => {
                            return res.status(500).json(error)
                        })
                    } else {
                        console.log(`Account exists already. Updating user ${user[0].user_id}`)
                        User.updateSpotifyUser(saveBody, user[0].id).then(user => {
                            return res.redirect(`${process.env.FRONTEND_URL}/profile`)
                        }).catch(error => {
                            console.log("Error updating user")
                            console.log(error)
                            return res.status(500).json(error)
                        })
                    }
                }).catch(error => {
                    console.log(error)
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
})

module.exports = router;