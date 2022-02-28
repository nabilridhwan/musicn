const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();

const authRoutes = require("./controller/auth")
const songApiRoutes = require("./controller/SongApi")

app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))

app.get("/", (req, res) => {res.sendFile("index.html")})
app.get("/user", (req, res) => {res.sendFile(path.join(__dirname, "public/user.html"))})

app.use("/auth", authRoutes)

app.use("/api/songs", songApiRoutes)


app.get("*", (req, res) => {
    return res.sendStatus(404);
})

app.listen(process.env.PORT, () => {
    `Server is running on port ${process.env.PORT}`
})