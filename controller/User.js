const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
    User.find().then(users => {
        const response = users.map(user => {
            return {
                app_userid: user.app_userid,
                images: user.images,
                name: user.name
            }
        })

        res.json(response)
    })
})

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    User.findOne({
            app_userid: req.params.id
        })
        .then(user => {
            if (!user) return res.sendStatus(404);
            const response = {
                app_userid: user.app_userid,
                images: user.images,
                name: user.name
            }

            res.json(response)
        })
})

module.exports = router;