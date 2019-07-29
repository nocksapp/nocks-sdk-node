const AmountTransformer = require('./Amount');
const PaymentMethodTransformer = require('./PaymentMethod');

/**
 * Transform balance currency
 *
 * @param currency
 */
const transform = (currency) => AmountTransformer.transform(Object.assign({}, currency, {
  deposit_payment_methods: currency.deposit_payment_methods && currency.deposit_payment_methods.data
    ? currency.deposit_payment_methods.data.map(PaymentMethodTransformer.transform) : undefined,

  withdrawal_payment_methods: currency.withdrawal_payment_methods && currency.withdrawal_payment_methods.data
    ? currency.withdrawal_payment_methods.data.map(PaymentMethodTransformer.transform) : undefined,
}));

/**
 * Reverse transform balance currency
 *
 * @param currency
 * @param prepareForRequest
 */
const reverseTransform = (currency, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  if (currency.deposit_payment_methods && !prepareForRequest) {
    reverseObject.deposit_payment_methods = {
      data: currency.deposit_payment_methods.map(PaymentMethodTransformer.reverseTransform),
    };
  }

  if (currency.withdrawal_payment_methods && !prepareForRequest) {
    reverseObject.withdrawal_payment_methods = {
      data: currency.withdrawal_payment_methods.map(PaymentMethodTransformer.reverseTransform),
    };
  }

  return AmountTransformer.reverseTransform(Object.assign({}, currency, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
