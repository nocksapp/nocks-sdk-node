const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const DepositTransformer = require('./transformers/Deposit');
const { buildQueryString, positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a deposit
   *
   * @param data
   * @param theme
   */
  const create = (data, { theme = '' } = {}) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: `/deposit?theme=${theme}`,
    accessToken: config.accessToken,
    data: DepositTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => DepositTransformer.transform(response.data));

  /**
   * Get deposits
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
      url: `/deposit?${buildQueryString(query)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(DepositTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get deposit
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot retrieve deposits without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/deposit/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => DepositTransformer.transform(response.data));
  };

  return {
    create,
    find,
    findOne,
  };
};
