const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const BalanceTransformer = require('./transformers/Balance');
const { positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Get balance
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    accessToken: config.accessToken,
    url: `/balance?page=${positiveInteger(page, 1)}`,
  })
    .then((response) => ({
      data: response.data.map(BalanceTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get balance
   *
   * @param currency
   */
  const findOne = ({ currency }) => {
    // Currency is required
    if (!isValidRequiredString(currency)) {
      return Promise.reject(new ValidationError('Cannot retrieve balance without "currency"', constants.errors.INVALID_CURRENCY));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      accessToken: config.accessToken,
      url: `/balance/${currency}`,
    })
      .then((response) => BalanceTransformer.transform(response.data));
  };

  return {
    find,
    findOne,
  };
};
