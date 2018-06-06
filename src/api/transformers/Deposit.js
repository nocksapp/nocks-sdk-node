const AmountTransformer = require('./Amount');
const DateTransformer = require('./Date');
const constants = require('./../../constants');

/**
 * Transform deposit
 *
 * @param deposit
 */
const transform = (deposit) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, deposit, {
  // Add confirmed function
  isConfirmed: () => deposit.status === constants.deposit.CONFIRMED,

  payment_method: deposit.payment_method && deposit.payment_method.data ? deposit.payment_method.data : undefined,
})));

/**
 * Reverse transform deposit
 *
 * @param deposit
 * @param prepareForRequest
 */
const reverseTransform = (deposit, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse payment_method
  if (deposit.payment_method && !prepareForRequest) {
    reverseObject.payment_method = {
      data: deposit.payment_method,
    };
  }

  return AmountTransformer.reverseTransform(DateTransformer.reverseTransform(Object.assign({}, deposit, reverseObject)));
};

module.exports = {
  transform,
  reverseTransform,
};
