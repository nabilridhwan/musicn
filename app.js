const express = require("express");
const app = express();
const path = require("path");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const requestMethods = require("./middlewares/requestMethods");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config({path: path.join(__dirname, "../.env")});

// https://www.npmjs.com/package/hpp
app.use(hpp())

app.use(morgan('tiny'))

// Limit size 1kb
app.use(express.json({limit: "1kb"}));
app.use(express.urlencoded({ extended: false, limit: "1kb" }));

app.use(cors())

app.use(cookieParser());

app.use(requestMethods)

app.use(express.static("client/build"))

const authRoutes = require("./controller/auth")
const songApiRoutes = require("./controller/SongApi")
const userApiRoutes = require("./controller/User")
const appAuthRoutes = require("./controller/app_auth")
const meRoutes = require("./controller/Me")
const errorRoutes = require("./controller/Error")

// Frontend routes

// Backend routes

// Auth routes
app.use("/api/v1/auth/", authRoutes)
app.use("/api/v1/auth/app", appAuthRoutes)

app.use("/api/v1/error/", errorRoutes);
app.use("/api/v1/me/", meRoutes)
app.use("/api/v1/songs", songApiRoutes)
app.use("/api/v1/user", userApiRoutes)

app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "./client/build/index.html"))})

module.exports = app;