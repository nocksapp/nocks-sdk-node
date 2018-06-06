const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const MerchantInvoiceTransformer = require('./transformers/MerchantInvoice');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Get merchant invoices
   *
   * @param merchant
   * @param page
   */
  const find = (merchant, { page = 1 } = {}) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot find merchant invoices without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-invoice?page=${positiveInteger(page, 1)}`,
      accessToken: config.accessToken,
    })
      .then((response) => ({
        data: response.data.map(MerchantInvoiceTransformer.transform),
        pagination: PaginationTransformer.transform(response.meta.pagination),
      }));
  };

  /**
   * Get merchant invoice
   *
   * @param merchant
   * @param uuid
   */
  const findOne = (merchant, { uuid }) => {
    // Merchant is required
    if (!isValidRequiredString(merchant.uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant invoice without "merchant"', constants.errors.INVALID_MERCHANT));
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a merchant invoice without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${merchant.uuid}/merchant-invoice/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => MerchantInvoiceTransformer.transform(response.data));
  };

  return {
    find,
    findOne,
  };
};
