const AmountTransformer = require('./Amount');
const UserTransformer = require('./User');
const MerchantTransformer = require('./Merchant');
const PaymentMethodTransformer = require('./PaymentMethod');

const transformCurrency = (currency) => AmountTransformer.transform(Object.assign({}, currency, {
  deposit_payment_methods: currency.deposit_payment_methods && currency.deposit_payment_methods.data
    ? currency.deposit_payment_methods.data.map(PaymentMethodTransformer.transform) : undefined,

  withdrawal_payment_methods: currency.withdrawal_payment_methods && currency.withdrawal_payment_methods.data
    ? currency.withdrawal_payment_methods.data.map(PaymentMethodTransformer.transform) : undefined,
}));

/**
 * Transform balance
 *
 * @param balance
 * @param config
 */
const transform = (balance, config) => AmountTransformer.transform(Object.assign({}, balance, {
  deposit_limit_month: AmountTransformer.transform(balance.deposit_limit_month),
  currency: transformCurrency(AmountTransformer.transform(balance.currency.data)),
  balanceable: balance.type === 'merchant'
    ? MerchantTransformer.transform(balance.balanceable.data, config) : UserTransformer.transform(balance.balanceable.data),
}));

/**
 * Reverse transform balance
 *
 * @param balance
 * @param prepareForRequest
 */
const reverseTransform = (balance, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // deposit_limit_month
  if (balance.deposit_limit_month && !prepareForRequest) {
    reverseObject.deposit_limit_month = AmountTransformer.reverseTransform(balance.deposit_limit_month);
  }

  // Currency
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
