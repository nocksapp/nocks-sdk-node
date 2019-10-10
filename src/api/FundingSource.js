const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaginationTransformer = require('./transformers/Pagination');
const FundingSourceTransformer = require('./transformers/FundingSource');
const { buildQueryString, positiveInteger } = require('./../utilities');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a new funding source
   *
   * @param data
   * @param twoFactorCode
   */
  const create = (data, { twoFactorCode }) => {
    // TwoFactorCode is required
    if (!isValidRequiredString(twoFactorCode)) {
      return Promise.reject(
        new ValidationError('Cannot create a funding source without "twoFactorCode"', constants.errors.INVALID_TWO_FACTOR_CODE)
      );
    }

    return makeRequest({
      ...config.request,
      method: 'POST',
      baseURL: config.baseUrl,
      url: '/funding-source',
      data: FundingSourceTransformer.reverseTransform(data, { prepareForRequest: true }),
      accessToken: config.accessToken,
      twoFactorCode,
    })
      .then((response) => FundingSourceTransformer.transform(response.data));
  };

  /**
   * Get funding sources
   */
  const find = ({ page = 1, limit = 15, currency = null } = {}) => {
    const query = { page: positiveInteger(page, 1), limit: positiveInteger(limit, 15) };

    if (currency !== null) {
      query.currency = currency;
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/funding-source?${buildQueryString(query)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(FundingSourceTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get funding source
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot retrieve funding source without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/funding-source/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => FundingSourceTransformer.transform(response.data));
  };

  /**
   * Delete a funding source
   *
   * @param uuid
   */
  const remove = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a funding source without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/funding-source/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  return {
    create,
    find,
    findOne,
    delete: remove,
  };
};
