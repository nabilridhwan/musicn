const express = require('express');
const { getErrorByCode } = require('../models/Errors');

const router = express.Router();

router.get('/:code', async (req, res) => {
  try {
    const data = await getErrorByCode(req.params.code);

    if (data.length === 0) return res.sendStatus(404);
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
