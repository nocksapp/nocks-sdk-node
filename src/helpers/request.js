const axios = require('axios');

const { ResponseError, ConfigurationError, ValidationError } = require('./../errors');
const constants = require('./../constants');
const { isValidRequiredString } = require('./validation');

/**
 * Make a request to the Nocks API
 *
 * @param config
 * @param callType api|oauth
 */
const makeRequest = (config, { callType = 'api' } = {}) => {
  const defaultConfig = {
    method: 'GET',
    headers: {},
  };

  if (config.accessToken !== undefined) {
    if (isValidRequiredString(config.accessToken)) {
      defaultConfig.headers.Authorization = `Bearer ${config.accessToken}`;
    } else {
      return Promise.reject(new ConfigurationError('A valid "accessToken" is required for the request'));
    }
  }

  if (config.twoFactorCode !== undefined) {
    if (isValidRequiredString(config.twoFactorCode)) {
      defaultConfig.headers['X-Nocks-2FA'] = config.twoFactorCode;
    } else {
      return Promise.reject(
        new ValidationError('A valid "twoFactorCode" is required for the request', constants.errors.INVALID_TWO_FACTOR_CODE)
      );
    }
  }

  return axios.request(Object.assign({}, defaultConfig, config))
    .then((response) => response.data)
    .catch((err) => {
      if (err.response) {
        const { data } = err.response;
        if (callType === 'oauth') {
          throw new ResponseError({ status: err.response.status, message: data.message, code: data.error });
        }

        throw new ResponseError({ status: data.status, message: data.error.message, code: data.error.code });
      } else if (err.request) {
        throw err.request;
      }

      throw err;
    });
};

module.exports = {
  makeRequest,
};
