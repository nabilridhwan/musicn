const express = require("express");
const { getErrorByCode } = require("../models/Errors");
const router = express.Router();

router.get("/:code", (req, res) => {
	getErrorByCode(req.params.code)
		.then((data) => {
			if (data.length == 0) return res.sendStatus(404);
			return res.json(data[0]);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
});

module.exports = router;
