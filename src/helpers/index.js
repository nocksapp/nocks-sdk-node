const { baseUrl, makeRequest } = require('./request');
const { isValidRequiredString, isNotEmptyArray } = require('./validation');

module.exports = {
  baseUrl,
  makeRequest,

  isValidRequiredString,
  isNotEmptyArray,
};
