const express = require("express");
const router = express.Router();

const PublicUserView = require("../models/PublicUserView");

router.get("/", (req, res) => {
    if(req.query.q){
       PublicUserView.getUserByUsername(req.query.q).then(users => {
           return res.json(users);
       }) 
    }else{

    PublicUserView.getAllUsers().then(users => {
        return res.json(users)
    })
    }
})

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    PublicUserView.getUserByUsername(req.params.id)
        .then(user => {
            if (!user || user.length == 0) {
                return res.sendStatus(404);
            } else {
                return res.json(user[0])
            }
        })
})

module.exports = router;