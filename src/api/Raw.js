const { makeRequest } = require('../helpers');

module.exports = (config) => {
  /**
   * Make a "raw" request to the Nocks API
   *
   * @param method
   * @param url
   * @param options
   */
  const request = ({ method, url }, options) => makeRequest({
    ...config.request,
    method,
    baseURL: config.baseUrl,
    url,
    accessToken: config.accessToken,
    ...options,
  });

  return {
    request,
  };
};
