const Response = require('../Response');

class ServerError extends Response {
  constructor(data) {
    super(500, data);
  }
}

module.exports = ServerError;
