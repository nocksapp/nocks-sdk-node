const { stringToFloat, floatToString } = require('./../../utilities');

/**
 * Transform payment method
 *
 * @param paymentMethod
 * @returns {*}
 */
const transform = (paymentMethod) => Object.assign({}, paymentMethod, {
  isVerificationMethod: () => paymentMethod.is_verification_method,
  isTransactionMethod: () => paymentMethod.is_transaction_method,
  isDepositMethod: () => paymentMethod.is_deposit_method,
  isWithdrawalMethod: () => paymentMethod.is_withdrawal_method,
  isRefundMethod: () => paymentMethod.is_refund_method,
  isDefault: () => paymentMethod.is_default,

  expiration_time: stringToFloat(paymentMethod.expiration_time, null),
});

/**
 * Reverse transform
 *
 * @param paymentMethod
 * @returns {*}
 */
const reverseTransform = (paymentMethod) => Object.assign({}, paymentMethod, {
  expiration_time: floatToString(paymentMethod.expiration_time, 0),
});

module.exports = {
  transform,
  reverseTransform,
};
