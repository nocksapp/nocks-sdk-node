const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const { positiveInteger } = require('./../utilities');
const BillTransformer = require('./transformers/Bill');
const PaginationTransformer = require('./transformers/Pagination');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a bill
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/bill',
    accessToken: config.accessToken,
    data: BillTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => BillTransformer.transform(config)(response.data));

  /**
   * Get bills
   *
   * @param page
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/bill?page=${positiveInteger(page, 1)}`,
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map(BillTransformer.transform(config)),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get bill
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot get a bill without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/bill/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => BillTransformer.transform(config)(response.data));
  };

  /**
   * Update a bill
   *
   * @param uuid
   * @param data
   */
  const update = ({ uuid }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot update a bill without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'PUT',
      baseURL: config.baseUrl,
      url: `/bill/${uuid}`,
      accessToken: config.accessToken,
      data: BillTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => BillTransformer.transform(config)(response.data));
  };

  /**
   * Delete a bill
   *
   * @param uuid
   * @returns {*}
   */
  const remove = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a bill without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/bill/${uuid}`,
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
