const AmountTransformer = require('./Amount');

const transformCurrency = (currency) => AmountTransformer.transform(Object.assign({}, currency, {
  deposit_payment_methods: currency.deposit_payment_methods.data,
  withdrawal_payment_methods: currency.withdrawal_payment_methods.data,
}));

/**
 * Transform balance
 *
 * @param balance
 */
const transform = (balance) => AmountTransformer.transform(Object.assign({}, balance, {
  currency: transformCurrency(AmountTransformer.transform(balance.currency.data)),
}));

/**
 * Reverse transform balance
 *
 * @param balance
 * @param prepareForRequest
 */
const reverseTransform = (balance, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Merchant profiles
  if (balance.currency && !prepareForRequest) {
    reverseObject.currency = {
      data: AmountTransformer.reverseTransform(balance.currency),
    };
  }

  return AmountTransformer.reverseTransform(Object.assign({}, balance, reverseObject));
};

module.exports = {
  transform,
  reverseTransform,
};
