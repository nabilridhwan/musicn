const mongoose = require("mongoose");
const Schema = mongoose.Schema

const User = new Schema({
    email: {type: String, unique: true},
    name: {type: String},
    app_userid: {type: String},
    spotify_userid: {type: String},
    country: {type: String},
    images: {type: Array},
    access_token: {type: String},
    refresh_token: {type: String},
})


const UserModel = mongoose.model("User", User);

module.exports = UserModel 