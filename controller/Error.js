const express = require("express");
const { getErrorByCode } = require("../models/Errors");
const router = express.Router();

router.get("/:code", (req, res) => {
    getErrorByCode(req.params.code)
    .then(data => {
        return res.json(data)
    }).catch(err => {
        return res.status(500).json(err)
    })
})


module.exports = router;