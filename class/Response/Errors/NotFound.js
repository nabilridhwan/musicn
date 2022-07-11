const Response = require('../Response');

class NotFoundError extends Response {
  constructor(data) {
    super(404, data);
  }
}

module.exports = NotFoundError;
