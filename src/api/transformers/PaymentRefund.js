const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const PaymentMethodTransformer = require('./PaymentMethod');

/**
 * Transform a "Nocks API" payment refund
 *
 * @param paymentRefund
 */
const transform = (paymentRefund) => DateTransformer.transform(AmountTransformer.transform(Object.assign({}, paymentRefund, {
  payment_method: paymentRefund.payment_method && paymentRefund.payment_method.data ?
    PaymentMethodTransformer.transform(paymentRefund.payment_method.data) : undefined,
})));

/**
 * Reverse transform
 *
 * @param paymentRefund
 * @param prepareForRequest
 */
const reverseTransform = (paymentRefund, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse payment_method
  if (paymentRefund.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: PaymentMethodTransformer.reverseTransform(paymentRefund.payment_method),
    };
  }

  return DateTransformer.reverseTransform(AmountTransformer.reverseTransform(Object.assign({}, paymentRefund, reverseObject)));
};

module.exports = {
  transform,
  reverseTransform,
};
