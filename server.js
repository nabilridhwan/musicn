const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();

const authRoutes = require("./controller/auth")
const songApiRoutes = require("./controller/SongApi")
const userApiRoutes = require("./controller/User")

app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))

// Frontend routes
app.get("/", (req, res) => {res.sendFile("index.html")})
app.get("/users", (req, res) => {res.sendFile(path.join(__dirname, "public/users.html"))})
app.get("/user/:id", (req, res) => {res.sendFile(path.join(__dirname, "public/user.html"))})

// Backend routes
// TODO: Make every backend endpoint start with /api/
app.use("/api/auth", authRoutes)
app.use("/api/songs", songApiRoutes)
app.use("/api/user", userApiRoutes)


app.get("*", (req, res) => {
    return res.sendStatus(404);
})

app.listen(process.env.PORT, () => {
    `Server is running on port ${process.env.PORT}`
})