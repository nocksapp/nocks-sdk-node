const DateTransformer = require('./Date');
const AmountTransformer = require('./Amount');
const MerchantClearingItemTransformer = require('./MerchantClearingItem');
const constants = require('./../../constants');

/**
 * Transform merchant clearing
 *
 * @param merchantClearing
 * @returns {*}
 */
const transform = (merchantClearing) => DateTransformer.transform(AmountTransformer.transform(Object.assign({}, merchantClearing, {
  // Transform merchant clearing items
  merchant_clearing_items: merchantClearing.merchant_clearing_items && merchantClearing.merchant_clearing_items.data
    ? merchantClearing.merchant_clearing_items.data.map(MerchantClearingItemTransformer.transform) : undefined,

  // Add status functions
  isOpen: () => merchantClearing.status === constants.merchantClearing.OPEN,
  isPaid: () => merchantClearing.status === constants.merchantClearing.PAID,
})));

/**
 * Reverse transform
 *
 * @param merchantClearing
 * @param prepareForRequest
 * @returns {*}
 */
const reverseTransform = (merchantClearing, { prepareForRequest = false } = {}) => {
  const reverseObject = {};

  // Reverse transform merchant clearing items
  if (merchantClearing.merchant_clearing_items && !prepareForRequest) {
    reverseObject.merchant_clearing_items = {
      data: merchantClearing.merchant_clearing_items.map(MerchantClearingItemTransformer.reverseTransform),
    };
  }

  return DateTransformer.reverseTransform(
    AmountTransformer.reverseTransform(Object.assign({}, merchantClearing, reverseObject)),
    { prepareForRequest }
  );
};

module.exports = {
  transform,
  reverseTransform,
};
