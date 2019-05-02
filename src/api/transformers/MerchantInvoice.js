const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const MerchantClearingTransformer = require('./MerchantClearing');
const constants = require('./../../constants');

/**
 * Transform a Nocks merchant invoice
 *
 * @param merchantInvoice
 */
const transform = (merchantInvoice) => AmountTransformer.transform(DateTransformer.transform(Object.assign({}, merchantInvoice, {
  // Merchant invoice clearings
  merchant_clearings: merchantInvoice.merchant_clearings && merchantInvoice.merchant_clearings.data ?
    merchantInvoice.merchant_clearings.data.map(MerchantClearingTransformer.transform) : undefined,

  // Add status functions
  isOpen: () => merchantInvoice.status === constants.merchantInvoice.OPEN,
  isPaid: () => merchantInvoice.status === constants.merchantInvoice.PAID,
  isExpired: () => merchantInvoice.status === constants.merchantInvoice.EXPIRED,
})));

/**
 * Reverse transform
 *
 * @param merchantInvoice
 * @param prepareForRequest
 */
const reverseTransform = (merchantInvoice, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Merchant invoice clearings
  if (merchantInvoice.merchant_clearings && !prepareForRequest) {
    reverseObject.merchant_clearings = {
      data: merchantInvoice.merchant_clearings.map(MerchantClearingTransformer.reverseTransform),
    };
  }

  return AmountTransformer.reverseTransform(
    DateTransformer.reverseTransform(Object.assign({}, merchantInvoice, reverseObject), { prepareForRequest })
  );
};

module.exports = {
  transform,
  reverseTransform,
};
