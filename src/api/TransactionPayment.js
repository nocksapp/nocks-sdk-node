const { makeRequest, isValidRequiredString } = require('../helpers');
const { ValidationError } = require('./../errors');
const PaymentTransformer = require('./transformers/Payment');
const PaymentRefundTransformer = require('./transformers/PaymentRefund');
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
        new ValidationError('Cannot create a payment without "transaction"', constants.errors.INVALID_MERCHANT)
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
   * Get one payment
   *
   * @param uuid
   */
  const findOne = ({ uuid }) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot find a payment without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      baseURL: config.baseUrl,
      url: `/payment/${uuid}`,
      accessToken: config.accessToken,
    })
      .then((response) => PaymentTransformer.transform(response.data));
  };

  /**
   * Cancel a payment
   *
   * @param uuid
   * @param paymentUuid - Backward Compatibility
   */
  const cancel = ({ uuid }, { uuid: paymentUuid = null } = {}) => {
    const payment = paymentUuid !== null ? paymentUuid : uuid;

    // Uuid is required
    if (!isValidRequiredString(payment)) {
      return Promise.reject(
        new ValidationError('Cannot cancel a payment without "uuid"', constants.errors.INVALID_UUID)
      );
    }

    return makeRequest({
      ...config.request,
      method: 'DELETE',
      baseURL: config.baseUrl,
      url: `/payment/${payment}`,
      accessToken: config.accessToken,
    });
  };

  /**
   * Refund a payment
   *
   * @param uuid
   * @param data
   */
  const refund = ({ uuid }, data) => {
    // Uuid is required
    if (!isValidRequiredString(uuid)) {
      return Promise.reject(new ValidationError('Cannot refund a payment without "uuid"', constants.errors.INVALID_UUID));
    }

    return makeRequest({
      ...config.request,
      method: 'POST',
      baseURL: config.baseUrl,
      url: `/payment/${uuid}/refund`,
      accessToken: config.accessToken,
      data: PaymentRefundTransformer.reverseTransform(data, { prepareForRequest: true }),
    })
      .then((response) => PaymentRefundTransformer.transform(response.data));
  };

  return {
    create,
    findOne,
    cancel,
    refund,
  };
};
