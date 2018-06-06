const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const MerchantTransformer = require('./transformers/Merchant');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a merchant
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/merchant',
    accessToken: config.accessToken,
    data: MerchantTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => MerchantTransformer.transform(response.data, config));

  /**
   * Get merchants
   *
   * @param page
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/merchant?page=${positiveInteger(page, 1)}`,
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map((x) => MerchantTransformer.transform(x, config)),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get merchant
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot get a merchant without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/merchant/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => MerchantTransformer.transform(response.data, config));
  };

  /**
   * Update a merchant
   *
   * @param uuid
   * @param data
   */
  const update = ({ uuid }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot update a merchant without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'PUT',
      baseURL: config.baseUrl,
      url: `/merchant/${uuid}`,
      accessToken: config.accessToken,
      data: MerchantTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => MerchantTransformer.transform(response.data, config));
  };

  /**
   * Delete a merchant
   *
   * @param uuid
   */
  const remove = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a merchant without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/merchant/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  return {
    create,
    find,
    findOne,
    update,
    delete: remove,
  };
};
