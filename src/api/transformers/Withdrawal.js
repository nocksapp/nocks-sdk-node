const AmountTransformer = require('./Amount');
const DateTransformer = require('./Date');
const PaymentMethodTransformer = require('./PaymentMethod');
const constants = require('./../../constants');

/**
 * Transform withdrawal
 *
 * @param withdrawal
 */
const transform = (withdrawal) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, withdrawal, {
  // Add status functions
  isOpen: () => withdrawal.status === constants.withdrawal.OPEN,
  isCompleted: () => withdrawal.status === constants.withdrawal.COMPLETED,

  payment_method: withdrawal.payment_method && withdrawal.payment_method.data ?
    PaymentMethodTransformer.transform(withdrawal.payment_method.data) : undefined,
})));

/**
 * Reverse transform withdrawal
 *
 * @param withdrawal
 * @param prepareForRequest
 */
const reverseTransform = (withdrawal, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse payment_method
  if (withdrawal.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: PaymentMethodTransformer.reverseTransform(withdrawal.payment_method),
    };
  }

  return AmountTransformer.reverseTransform(
    DateTransformer.reverseTransform(Object.assign({}, withdrawal, reverseObject), { prepareForRequest })
  );
};

module.exports = {
  transform,
  reverseTransform,
};
