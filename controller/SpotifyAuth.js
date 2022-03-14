const {
    decode
} = require("../utils/jwt")

module.exports.authenticate = async (req, res) => {
    const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing"
    const SHOW_DIALOG = true;
    return res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`)
}

module.exports.callback = async (req, res) => {
    // TODO: Check for possible errors
    if (req.query.error) throw new Error("The user has canceled the authentication")

    const decoded = await decode(req.cookies.jwt)

    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code")
    formData.append("code", req.query.code)
    formData.append("redirect_uri", process.env.REDIRECT_URI)

    // Get a refresh and access token
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

            let {
                email,
                display_name,
                country,
                images,
                id,
            } = userResponse.data;

            if (images.length == 0) {
                images = null
            } else {
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
            SpotifyUser.getUserByEmail(email).then(user => {
                if (user.length == 0) {
                    console.log("Inserting new Spotify User")
                    SpotifyUser.insertUser(saveBody).then(user => {
                        return res.redirect(`${process.env.FRONTEND_URL}/profile`)
                    }).catch(error => {
                        return res.status(500).json(error)
                    })
                } else {
                    console.log(`Account exists already. Updating user.`)

                    SpotifyUser.updateSpotifyUser(saveBody, user[0].id).then(user => {
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
            throw new Error("Error getting user data")
        })

    }).catch(error => {
        console.log("An error occured")
        return res.status(500).send(error)
    })



}