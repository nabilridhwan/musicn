const pool = require('../utils/dbConfig');

async function getErrorByCode(code) {
  const res = await pool.query(
    `
                SELECT *
                FROM "errors"
                WHERE id = ${code};`,
  );
  return res.rows;
}

module.exports = {
  getErrorByCode,
};
