module.exports = (req, res, next) => {
  if (!req.params.id) {
    return res.sendStatus(400);
  }
  req.userId = req.params.id;

  return next();
};
