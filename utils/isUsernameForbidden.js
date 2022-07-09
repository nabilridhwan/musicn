function isUsernameForbidden(u) {
	let hasForbiddenCharacters = u.match(/[^a-z0-9_.]/g);

	if (hasForbiddenCharacters == null) {
		return false;
	} else {
		return true;
	}
}

module.exports = isUsernameForbidden;
