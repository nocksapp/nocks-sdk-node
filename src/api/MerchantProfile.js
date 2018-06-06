const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const MerchantProfileTransformer = require('./transformers/MerchantProfile');
const TurnoverTransformer = require('./transformers/TurnoverTransformer');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a merchant profile
   *
   * @param merchant
   * @param data
   */
  const create = (merchant, data) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot create a merchant profile without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    return makeRequest({
      ...config.request,
      method: 'POST',
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-profile`,
      accessToken: config.accessToken,
      data: MerchantProfileTransformer.reverseTransform(data),
    })
      .then((response) => MerchantProfileTransformer.transform(response.data));
  };

  /**
   * Get merchant profiles
   *
   * @param merchant
   * @param page
   */
  const find = (merchant, { page = 1 } = {}) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot find merchant profiles without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-profile?page=${positiveInteger(page, 1)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(MerchantProfileTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get merchant profile
   *
   * @param merchant
   * @param uuid
   */
  const findOne = (merchant, { uuid }) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant profile without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant profile without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-profile/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => MerchantProfileTransformer.transform(response.data));
  };

  /**
   * Create a turnover for the merchant Profile
   *
   * @param merchant
   * @param uuid
   * @param data
   */
  const createTurnover = (merchant, { uuid }, data) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot create a turnover without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot create a turnover without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'POST',
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-profile/${uuid}/turnover`,
      accessToken: config.accessToken,
      data: TurnoverTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => TurnoverTransformer.transform(response.data));
  };

  /**
   * Delete a merchant profile
   *
   * @param merchant
   * @param uuid
   */
  const remove = (merchant, { uuid }) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a merchant profile without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a merchant profile without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-profile/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  return {
    create,
    find,
    findOne,
    createTurnover,
    delete: remove,
  };
};
