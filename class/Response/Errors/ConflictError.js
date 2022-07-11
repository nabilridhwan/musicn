const Response = require('../Response');

class ConflictError extends Response {
  constructor(data) {
    super(409, data);
  }
}

module.exports = ConflictError;
