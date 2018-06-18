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
    .then((response) => ({
      validation: response.validation,
    }));

  return {
    validate,
  };
};
