const Response = require('../Response');

class BadRequestError extends Response {
  constructor(data) {
    super(400, data);
  }
}

module.exports = BadRequestError;
