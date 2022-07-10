module.exports = (req, res, next) => {
  if (!req.params.username) {
    return res.sendStatus(400);
  }
  req.username = req.params.username;

  return next();
};
