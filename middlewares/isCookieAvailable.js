function isCookieAvailable(req, res, next) {
	if (req.cookies.jwt) {
		next();
	} else {
		res.status(403).json({
			message: "Forbidden",
		});
	}
}

module.exports = isCookieAvailable;
