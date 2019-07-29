const axios = require('axios');

const { ConfigurationError, ValidationError } = require('./../errors');
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
          const error = new Error(data.message);
          error.status = err.response.status;
          error.code = data.error;

          throw error;
        }

        const error = new Error(data.error.message);
        error.status = data.status;
        error.code = data.error.code;

        throw error;
      } else if (err.request) {
        throw new Error(`No response received from the "${err.config.method}" request to ${err.config.url}. Message: "${err.message}"`);
      }

      throw new Error(err.message);
    });
};

module.exports = {
  makeRequest,
};
