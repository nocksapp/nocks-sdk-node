module.exports = {
  production: {
    request: {
      timeout: 10 * 1000, // 10 seconds
    },
  },
  sandbox: {
    request: {
      timeout: 30 * 1000, // 30 seconds
    },
  },
};
