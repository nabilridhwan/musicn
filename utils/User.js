const axios = require("axios");
require("dotenv").config();

const User = {
    getAccessToken: (refresh_token) => {
        return new Promise((resolve, reject) => {


            const formData = new URLSearchParams();
            formData.append("grant_type", "refresh_token")
            formData.append("refresh_token", refresh_token)


            // TODO: Fix token issue
            axios({
                method: "POST",
                url: "https://accounts.spotify.com/api/token",
                data: formData,
                headers: {
                    "Authorization": `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64")}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(tokenResponse => {
                if (tokenResponse.data.error) {
                    reject(tokenResponse.data.error)
                } else {
                    resolve(tokenResponse.data)
                }
            }).catch(error => {
                resolve(error)
            })
        })
    }
}

module.exports = User