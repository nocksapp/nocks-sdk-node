const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const DepositTransformer = require('./transformers/Deposit');
const { positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a deposit
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/deposit',
    accessToken: config.accessToken,
    data: DepositTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => DepositTransformer.transform(response.data));

  /**
   * Get deposits
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/deposit?page=${positiveInteger(page, 1)}`,
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map(DepositTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

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
