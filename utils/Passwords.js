const bcrypt = require('bcrypt');

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compareHash(password, hash) {
  const comparison = await bcrypt.compare(password, hash);
  return comparison;
}

module.exports = { generateHash, compareHash };
