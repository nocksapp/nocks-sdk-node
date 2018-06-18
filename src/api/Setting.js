const { makeRequest } = require('../helpers');

module.exports = (config) => {
  /**
   * Get the Nocks settings
   */
  const get = () => makeRequest({
    ...config.request,
    method: 'GET',
    baseURL: config.baseUrl,
    url: '/settings',
  });

  return {
    get,
  };
};
