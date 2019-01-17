const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const PaymentMethodTransformer = require('./PaymentMethod');

/**
 * Transform balance transfer data
 *
 * @param data
 */
const transform = (data) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, data, {
  payment_method: data.payment_method && data.payment_method.data ?
    PaymentMethodTransformer.transform(data.payment_method.data) : undefined,
})));

/**
 * Reverse transform balance transfer data
 *
 * @param data
 * @param prepareForRequest
 */
const reverseTransform = (data, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse payment_method
  if (data.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: PaymentMethodTransformer.reverseTransform(data.payment_method),
    };
  }

  return AmountTransformer.reverseTransform(Object.assign({}, data, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
