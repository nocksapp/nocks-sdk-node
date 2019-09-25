const { makeRequest } = require('../helpers');
const AmountTransformer = require('./transformers/Amount');
const PaginationTransformer = require('./transformers/Pagination');

module.exports = (config) => {
  /**
   * Get the fee settings
   */
  const get = () => makeRequest({
    ...config.request,
    method: 'GET',
    baseURL: config.baseUrl,
    url: '/fee',
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map(AmountTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  return {
    get,
  };
};
