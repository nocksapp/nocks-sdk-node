const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const BalanceTransformer = require('./transformers/Balance');
const BalanceTransferTransformer = require('./transformers/BalanceTransfer');
const { positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a Balance
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/balance',
    accessToken: config.accessToken,
    data: BalanceTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => BalanceTransformer.transform(response.data, config));

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
      data: response.data.map((x) => BalanceTransformer.transform(x, config)),
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
      .then((response) => BalanceTransformer.transform(response.data, config));
  };

  /**
   * Transfer between balances
   *
   * @param data
   */
  const transfer = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/balance/transfer',
    accessToken: config.accessToken,
    data: BalanceTransferTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => BalanceTransferTransformer.transform(response.data, config));

  return {
    create,
    find,
    findOne,
    transfer
  };
};
