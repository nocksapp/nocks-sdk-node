const { ValidationError } = require('./../errors');
const { makeRequest, isValidRequiredString } = require('../helpers');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const AddressTransformer = require('./transformers/Address');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a new address
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/address',
    accessToken: config.accessToken,
    data: AddressTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => AddressTransformer.transform(response.data));

  /**
   * Get addresses
   *
   * @param page
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/address?page=${positiveInteger(page, 1)}`,
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map(AddressTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get a single address
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot get an address without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/address/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => AddressTransformer.transform(response.data));
  };

  /**
   * Update a address
   *
   * @param uuid
   * @param data
   */
  const update = ({ uuid }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot update an address without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'PUT',
      baseURL: config.baseUrl,
      url: `/address/${uuid}`,
      accessToken: config.accessToken,
      data: AddressTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => AddressTransformer.transform(response.data));
  };

  /**
   * Delete a user
   *
   * @param uuid
   */
  const remove = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete an address without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/address/${uuid}`,
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
