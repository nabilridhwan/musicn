const express = require("express");
const app = express();
const path = require("path");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const requestMethods = require("./middlewares/requestMethods");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const authRoutes = require("./controller/auth");
const songApiRoutes = require("./controller/SongApi");
const userApiRoutes = require("./controller/User");
const appAuthRoutes = require("./controller/app_auth");
const meRoutes = require("./controller/Me");
const errorRoutes = require("./controller/Error");

// Dotenv
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// https://www.npmjs.com/package/hpp
app.use(hpp());

app.use(morgan("tiny"));

// Limit size 1kb
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: false, limit: "1kb" }));

// Use cors
app.use(cors());

// Use cookies
app.use(cookieParser());

// Use request methods, otherwise it will be a 405
app.use(requestMethods);

// ! Backend routes
// Auth routes for Spotify
app.use("/api/v1/auth/", authRoutes);

// Auth routes for Application
app.use("/api/v1/auth/app", appAuthRoutes);

// Error routes
app.use("/api/v1/error/", errorRoutes);

// Me routes
app.use("/api/v1/me/", meRoutes);

// Songs routes
app.use("/api/v1/songs", songApiRoutes);

// User routes
app.use("/api/v1/user", userApiRoutes);

module.exports = app;
