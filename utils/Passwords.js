const bcrypt = require("bcrypt");

async function generateHash(password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

async function compareHash(password, hash) {
	return await bcrypt.compare(password, hash);
}

module.exports = { generateHash, compareHash };
