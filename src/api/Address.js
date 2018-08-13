const { makeRequest } = require('../helpers');

module.exports = (config) => {
  /**
   * Validate an address
   */
  const validate = ({ address, currency }) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/address/validate',
    data: {
      address,
      currency,
    },
  })
    .then(response => response.validation);

  /**
   * Validate multiple addresses in an array
   *
   * @param addresses
   */
  const validateArray = (addresses) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/address/validate',
    data: {
      addresses,
    },
  })
    .then(response => response.validation);

  return {
    validate,
    validateArray,
  };
};
