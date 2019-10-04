const { makeRequest } = require('../helpers');
const { positiveInteger } = require('./../utilities');
const AmountTransformer = require('./transformers/Amount');
const PaginationTransformer = require('./transformers/Pagination');

module.exports = (config) => {
  /**
   * Get the fee settings
   */
  const get = ({ page = 1, limit = 15 } = {}) => makeRequest({
    ...config.request,
    method: 'GET',
    baseURL: config.baseUrl,
    url: `/fee?page=${positiveInteger(page, 1)}&limit=${positiveInteger(limit, 15)}`,
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
