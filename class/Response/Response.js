class Response {
  constructor(status, data) {
    this.success = status > 400;
    this.status = status;
    this.data = data;
  }
}

module.exports = Response;
