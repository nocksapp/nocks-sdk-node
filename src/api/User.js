const { ValidationError } = require('./../errors');
const { makeRequest, isValidRequiredString } = require('../helpers');
const UserTransformer = require('./transformers/User');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a new user
   *
   * @param data
   */
  const create = (data) => makeRequest({
    ...config.request,
    method: 'POST',
    baseURL: config.baseUrl,
    url: '/user',
    data: UserTransformer.reverseTransform(data, { prepareForRequest: true }),
  })
    .then((response) => UserTransformer.transform(response.data));

  /**
   * Get the authenticated user or an other user by uuid
   *
   * @param uuid
   */
  const findOne = ({ uuid = null } = {}) => {
    const url = uuid ? `/user/${uuid}` : '/user';

    return makeRequest({
      ...config.request,
      accessToken: config.accessToken,
      baseURL: config.baseUrl,
      url,
    })
      .then((response) => {
        if (uuid) {
          return response.data;
        }

        return response.data[0];
      })
      .then((user) => UserTransformer.transform(user));
  };

  /**
   * Update a user
   *
   * @param uuid
   * @param twoFactorCode
   * @param data
   */
  const update = ({ uuid, twoFactorCode }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot update a user without "uuid"', constants.errors.INVALID_UUID));
    }

    // TwoFactorCode is required
    if (!isValidRequiredString(twoFactorCode)) {
      return Promise.reject(new ValidationError('Cannot update a user without "twoFactorCode"', constants.errors.INVALID_TWO_FACTOR_CODE));
    }

    return makeRequest({
      ...config.request,
      method: 'PUT',
      baseURL: config.baseUrl,
      url: `/user/${uuid}`,
      accessToken: config.accessToken,
      twoFactorCode,
      data: UserTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => UserTransformer.transform(response.data));
  };

  /**
   * Delete a user
   *
   * @param uuid
   * @param twoFactorCode
   */
  const remove = ({ uuid, twoFactorCode }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot delete a user without "uuid"', constants.errors.INVALID_UUID));
    }

    // TwoFactorCode is required
    if (!isValidRequiredString(twoFactorCode)) {
      return Promise.reject(new ValidationError('Cannot delete a user without "twoFactorCode"', constants.errors.INVALID_TWO_FACTOR_CODE));
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/user/${uuid}`,
      accessToken: config.accessToken,
      twoFactorCode,
    });
  };

  return {
    create,
    findAuthenticated: () => findOne(),
    findOne,
    update,
    delete: remove,
  };
};
