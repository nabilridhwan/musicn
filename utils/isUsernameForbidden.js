function isUsernameForbidden(u) {
  const hasForbiddenCharacters = u.match(/[^a-z0-9_.]/g);
  return hasForbiddenCharacters == null;
}

module.exports = isUsernameForbidden;
