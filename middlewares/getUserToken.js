function getUserToken(req, res, next) {
  if (!req.cookies.jwt) {
    console.log(req.cookies);
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  req.token = req.cookies.jwt;
  return next();
}

module.exports = getUserToken;
