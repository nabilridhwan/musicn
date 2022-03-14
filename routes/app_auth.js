const express = require("express");
const router = express.Router();

const AppAuth = require("../controller/AppAuth")

router.post("/signup", AppAuth.signup)
router.post("/login", AppAuth.login)
router.get("/logout", AppAuth.logout)

module.exports = router;