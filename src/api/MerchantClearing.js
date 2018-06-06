const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const MerchantClearingTransformer = require('./transformers/MerchantClearing');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Get merchant clearings
   */
  const find = (merchant, { page = 1 } = {}) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot get a merchant clearing without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-clearing?page=${positiveInteger(page, 1)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(MerchantClearingTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get merchant clearing
   */
  const findOne = (merchant, { uuid }) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant clearing without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant clearing without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-clearing/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => MerchantClearingTransformer.transform(response.data));
  };

  return {
    find,
    findOne,
  };
};
