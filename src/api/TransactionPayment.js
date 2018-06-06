const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaymentTransformer = require('./transformers/Payment');
const constants = require('./../constants');

module.exports = (config) => {
  /**
   * Create a transaction payment
   *
   * @param transaction
   * @param data
   */
  const create = (transaction, data) => {
    // Transaction is required
    if (!isValidRequiredString(transaction.uuid)) {
      return Promise.reject(
        new ValidationError('Cannot create a transaction payment without "transaction"', constants.errors.INVALID_MERCHANT)
      );
    }

    return makeRequest({
      ...config.request,
      method: 'POST',
      baseURL: config.baseUrl,
      url: `/transaction/${transaction.uuid}/payment`,
      accessToken: config.accessToken,
      data: PaymentTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => PaymentTransformer.transform(response.data));
  };

  /**
   * Cancel a transaction payment
   *
   * @param transaction
   * @param uuid
   */
  const cancel = (transaction, { uuid }) => {
    // Transaction is required
    if (!isValidRequiredString(transaction.uuid)) {
      return Promise.reject(
        new ValidationError('Cannot cancel a transaction payment without "transaction"', constants.errors.INVALID_MERCHANT)
      );
    }

    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(
        new ValidationError('Cannot cancel a transaction payment without "uuid"', constants.errors.INVALID_UUID)
      );
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/transaction/${transaction.uuid}/payment/${uuid}`,
      accessToken: config.accessToken,
    });
  };

  return {
    create,
    cancel,
  };
};
