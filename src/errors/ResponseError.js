module.exports = class ResponseError extends Error {
  constructor({ message, code, status }) {
    super(message);

    this.status = status;
    this.code = code;
  }
};
