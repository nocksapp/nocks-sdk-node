const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const PaymentMethodTransformer = require('./PaymentMethod');
const constants = require('./../../constants');

/**
 * Transform a "Nocks API" payment
 *
 * @param payment
 */
const transform = (payment) => DateTransformer.transform(AmountTransformer.transform(Object.assign({}, payment, {
  // Add status functions
  isOpen: () => payment.status === constants.payment.OPEN,
  isPending: () => payment.status === constants.payment.PENDING,
  isCancelled: () => payment.status === constants.payment.CANCELLED,
  isPaid: () => payment.status === constants.payment.PAID,
  isExpired: () => payment.status === constants.payment.EXPIRED,
  isRefunded: () => payment.status === constants.payment.REFUNDED,

  payment_method: payment.payment_method && payment.payment_method.data ?
    PaymentMethodTransformer.transform(payment.payment_method.data) : undefined,
})));

/**
 * Reverse transform
 *
 * @param payment
 * @param prepareForRequest
 */
const reverseTransform = (payment, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse payment_method
  if (payment.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: PaymentMethodTransformer.reverseTransform(payment.payment_method),
    };
  }

  return DateTransformer.reverseTransform(
    AmountTransformer.reverseTransform(Object.assign({}, payment, reverseObject)),
    { prepareForRequest }
  );
};

module.exports = {
  transform,
  reverseTransform,
};
