const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const WithdrawalTransformer = require('./transformers/Withdrawal');
const { buildQueryString, positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a withdrawal
   *
   * @param data
   * @param twoFactorCode (optional)
   */
  const create = (data, { twoFactorCode } = {}) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/withdrawal',
    accessToken: config.accessToken,
    twoFactorCode,
    data: WithdrawalTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => WithdrawalTransformer.transform(response.data));

  /**
   * Get withdrawals
   *
   * @param page
   * @param balance
   */
  const find = ({ page = 1, balance = null } = {}) => {
    const query = { page: positiveInteger(page, 1) };

    if (balance !== null) {
      query.balance = balance;
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/withdrawal?${buildQueryString(query)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(WithdrawalTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get withdrawal
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot retrieve withdrawals without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/withdrawal/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => WithdrawalTransformer.transform(response.data));
  };

  return {
    create,
    find,
    findOne,
  };
};
