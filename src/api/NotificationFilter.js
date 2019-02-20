const { ValidationError } = require('./../errors');
const { makeRequest, isValidRequiredString } = require('../helpers');
const { positiveInteger } = require('./../utilities');
const PaginationTransformer = require('./transformers/Pagination');
const NotificationFilterTransformer = require('./transformers/NotificationFilter');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a new notification-filter
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/notification-filter',
    accessToken: config.accessToken,
    data: NotificationFilterTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => NotificationFilterTransformer.transform(response.data));

  /**
   * Get notification filters
   *
   * @param page
   */
  const find = ({ page = 1 } = {}) => makeRequest({
    ...config.request,
    baseURL: config.baseUrl,
    url: `/notification-filter?page=${positiveInteger(page, 1)}`,
    accessToken: config.accessToken,
  })
    .then((response) => ({
      data: response.data.map(NotificationFilterTransformer.transform),
      pagination: PaginationTransformer.transform(response.meta.pagination),
    }));

  /**
   * Get a single notification-filter
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot get a notification-filter without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/notification-filter/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => NotificationFilterTransformer.transform(response.data));
  };

  /**
   * Update a notification-filter
   *
   * @param uuid
   * @param data
   */
  const update = ({ uuid }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot update a notification-filter without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'PUT',
      baseURL: config.baseUrl,
      url: `/notification-filter/${uuid}`,
      accessToken: config.accessToken,
      data: NotificationFilterTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => NotificationFilterTransformer.transform(response.data));
  };

  /**
   * Delete a notification-filter
   *
   * @param uuid
   */
  const remove = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a notification-filter without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/notification-filter/${uuid}`,
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
